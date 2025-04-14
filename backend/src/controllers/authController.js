// Controlador de autenticación
const { User } = require('../db/models');
const { hashPassword, comparePassword, generateToken } = require('../utils/auth');

// Registro de usuario
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validar datos
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    
    // Verificar si el email ya existe
    const existingUser = await User.getByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    
    // Hash de la contraseña
    const hashedPassword = await hashPassword(password);
    
    // Crear usuario
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      subscription_status: 'free'
    });
    
    // Generar token
    const token = generateToken(user.id);
    
    // Responder sin incluir la contraseña
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(201).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Inicio de sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validar datos
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }
    
    // Buscar usuario
    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Verificar contraseña
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Actualizar último login
    await User.update(user.id, { last_login: new Date() });
    
    // Generar token
    const token = generateToken(user.id);
    
    // Responder sin incluir la contraseña
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Obtener perfil de usuario
const getProfile = async (req, res) => {
  try {
    // El usuario ya está en req.user gracias al middleware de autenticación
    const { password, ...userWithoutPassword } = req.user;
    
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Actualizar perfil de usuario
const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    
    // Actualizar usuario
    const updatedUser = await User.update(req.user.id, { 
      name,
      updated_at: new Date()
    });
    
    // Responder sin incluir la contraseña
    const { password, ...userWithoutPassword } = updatedUser;
    
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Cambiar contraseña
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Validar datos
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Contraseña actual y nueva son requeridas' });
    }
    
    // Verificar contraseña actual
    const isPasswordValid = await comparePassword(currentPassword, req.user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña actual incorrecta' });
    }
    
    // Hash de la nueva contraseña
    const hashedPassword = await hashPassword(newPassword);
    
    // Actualizar contraseña
    await User.update(req.user.id, { 
      password: hashedPassword,
      updated_at: new Date()
    });
    
    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
};
