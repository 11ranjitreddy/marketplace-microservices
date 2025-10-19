const API_BASE_URL = 'http://localhost:9022/api';

export const orderService = {
  createOrder: async (orderData) => {
    try {
      console.log('Sending order data:', orderData);
      
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      console.log('Order created successfully:', result);
      return result;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  getOrder: async (orderNumber) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderNumber}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  updateOrderStatus: async (orderNumber, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderNumber}/status?status=${status}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
};