// Servicio de Stripe para gestión de suscripciones
const config = require('../config/config');
const { User, Subscription } = require('../db/models');

// Simulación de Stripe para desarrollo
// En una implementación real, aquí se utilizaría la API de Stripe
const stripeSimulator = {
  // Crear un cliente
  createCustomer: async (userData) => {
    return {
      id: `cus_${Math.random().toString(36).substring(2, 10)}`,
      email: userData.email,
      name: userData.name,
      created: Date.now()
    };
  },
  
  // Crear una suscripción
  createSubscription: async (customerId, planId) => {
    const currentPeriodStart = new Date();
    const currentPeriodEnd = new Date();
    currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);
    
    return {
      id: `sub_${Math.random().toString(36).substring(2, 10)}`,
      customer: customerId,
      plan: planId,
      status: 'active',
      current_period_start: currentPeriodStart.getTime() / 1000,
      current_period_end: currentPeriodEnd.getTime() / 1000,
      created: Date.now() / 1000
    };
  },
  
  // Cancelar una suscripción
  cancelSubscription: async (subscriptionId) => {
    return {
      id: subscriptionId,
      status: 'canceled',
      cancel_at_period_end: true
    };
  },
  
  // Obtener planes disponibles
  getPlans: async () => {
    return [
      {
        id: 'premium_monthly',
        nickname: 'Premium Mensual',
        amount: 499, // en centavos
        currency: 'usd',
        interval: 'month'
      },
      {
        id: 'premium_yearly',
        nickname: 'Premium Anual',
        amount: 4999, // en centavos
        currency: 'usd',
        interval: 'year'
      }
    ];
  }
};

// Crear un cliente de Stripe
const createCustomer = async (user) => {
  try {
    // En una implementación real, aquí se llamaría a la API de Stripe
    const customer = await stripeSimulator.createCustomer({
      email: user.email,
      name: user.name
    });
    
    return customer;
  } catch (error) {
    console.error('Error al crear cliente de Stripe:', error);
    throw new Error('No se pudo crear el cliente de Stripe');
  }
};

// Crear una suscripción
const createSubscription = async (user, planId) => {
  try {
    // Verificar si el usuario ya tiene un cliente de Stripe
    let subscription = await Subscription.getByUserId(user.id);
    let stripeCustomerId;
    
    if (subscription && subscription.stripe_customer_id) {
      stripeCustomerId = subscription.stripe_customer_id;
    } else {
      // Crear cliente de Stripe
      const customer = await createCustomer(user);
      stripeCustomerId = customer.id;
    }
    
    // En una implementación real, aquí se llamaría a la API de Stripe
    const stripeSubscription = await stripeSimulator.createSubscription(stripeCustomerId, planId);
    
    // Calcular fecha de fin de suscripción
    const endDate = new Date(stripeSubscription.current_period_end * 1000);
    
    // Crear o actualizar suscripción en la base de datos
    if (subscription) {
      subscription = await Subscription.update(subscription.id, {
        stripe_subscription_id: stripeSubscription.id,
        status: stripeSubscription.status,
        plan_type: planId,
        current_period_start: new Date(stripeSubscription.current_period_start * 1000),
        current_period_end: endDate
      });
    } else {
      subscription = await Subscription.create({
        user_id: user.id,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: stripeSubscription.id,
        status: stripeSubscription.status,
        plan_type: planId,
        current_period_start: new Date(stripeSubscription.current_period_start * 1000),
        current_period_end: endDate
      });
    }
    
    // Actualizar estado de suscripción del usuario
    await User.updateSubscription(user.id, config.SUBSCRIPTION_PLANS.PREMIUM, endDate);
    
    return {
      subscription,
      stripeSubscription
    };
  } catch (error) {
    console.error('Error al crear suscripción:', error);
    throw new Error('No se pudo crear la suscripción');
  }
};

// Cancelar una suscripción
const cancelSubscription = async (user) => {
  try {
    // Obtener suscripción del usuario
    const subscription = await Subscription.getByUserId(user.id);
    
    if (!subscription || !subscription.stripe_subscription_id) {
      throw new Error('No se encontró una suscripción activa');
    }
    
    // En una implementación real, aquí se llamaría a la API de Stripe
    const canceledSubscription = await stripeSimulator.cancelSubscription(subscription.stripe_subscription_id);
    
    // Actualizar suscripción en la base de datos
    const updatedSubscription = await Subscription.update(subscription.id, {
      status: 'canceled'
    });
    
    // Actualizar estado de suscripción del usuario
    // Nota: En una implementación real, el usuario mantendría el acceso premium hasta el final del período
    await User.updateSubscription(user.id, config.SUBSCRIPTION_PLANS.FREE);
    
    return {
      subscription: updatedSubscription,
      stripeSubscription: canceledSubscription
    };
  } catch (error) {
    console.error('Error al cancelar suscripción:', error);
    throw new Error('No se pudo cancelar la suscripción');
  }
};

// Obtener planes disponibles
const getAvailablePlans = async () => {
  try {
    // En una implementación real, aquí se llamaría a la API de Stripe
    const stripePlans = await stripeSimulator.getPlans();
    
    // Formatear planes para la aplicación
    const plans = stripePlans.map(plan => ({
      id: plan.id,
      name: plan.nickname,
      price: plan.amount / 100,
      currency: plan.currency,
      interval: plan.interval,
      features: plan.id.includes('yearly') 
        ? [
            'Interpretaciones extendidas',
            'Análisis mensual y semanal con visualización',
            'Chat IA contextual ("analista onírico")',
            'Tarjetas y PDFs exportables',
            'Modo privado (FaceID, PIN)',
            'Modo simbología personalizada',
            '2 meses gratis'
          ]
        : [
            'Interpretaciones extendidas',
            'Análisis mensual y semanal con visualización',
            'Chat IA contextual ("analista onírico")',
            'Tarjetas y PDFs exportables',
            'Modo privado (FaceID, PIN)',
            'Modo simbología personalizada'
          ]
    }));
    
    return plans;
  } catch (error) {
    console.error('Error al obtener planes disponibles:', error);
    throw new Error('No se pudieron obtener los planes disponibles');
  }
};

// Verificar si un usuario tiene acceso a funcionalidades premium
const checkPremiumAccess = async (userId) => {
  try {
    const user = await User.getById(userId);
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    
    const isPremium = user.subscription_status === config.SUBSCRIPTION_PLANS.PREMIUM;
    const subscriptionEndDate = user.subscription_end_date;
    
    return {
      isPremium,
      subscriptionEndDate,
      subscriptionStatus: user.subscription_status
    };
  } catch (error) {
    console.error('Error al verificar acceso premium:', error);
    throw new Error('No se pudo verificar el acceso premium');
  }
};

// Generar URL de pago (simulado para desarrollo)
const generateCheckoutSession = async (userId, planId) => {
  try {
    // En una implementación real, aquí se generaría una sesión de checkout de Stripe
    const checkoutUrl = `https://checkout.stripe.com/pay/cs_test_${Math.random().toString(36).substring(2, 10)}`;
    
    return {
      url: checkoutUrl,
      planId,
      userId
    };
  } catch (error) {
    console.error('Error al generar sesión de checkout:', error);
    throw new Error('No se pudo generar la sesión de checkout');
  }
};

module.exports = {
  createCustomer,
  createSubscription,
  cancelSubscription,
  getAvailablePlans,
  checkPremiumAccess,
  generateCheckoutSession
};
