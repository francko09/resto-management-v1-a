import React, { useState, useEffect } from 'react';
import { Check, Clock } from 'lucide-react';
import { databaseService } from '../services/DatabaseService';

interface Order {
  id: number;
  items: { id: number; quantity: number }[];
  status: 'pending' | 'ready' | 'served';
  timestamp: Date;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

const KitchenView: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const loadedOrders = await databaseService.getOrders();
      setOrders(loadedOrders);
      const loadedMenuItems = await databaseService.getMenuItems();
      setMenuItems(loadedMenuItems);
    };
    loadData();

    const interval = setInterval(loadData, 5000); // Rafraîchir toutes les 5 secondes

    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = async (orderId: number, newStatus: 'ready' | 'served') => {
    await databaseService.updateOrderStatus(orderId, newStatus);
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Commandes en cuisine</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`bg-white p-4 rounded-lg shadow ${
              order.status === 'pending'
                ? 'border-l-4 border-yellow-500'
                : order.status === 'ready'
                ? 'border-l-4 border-green-500'
                : 'border-l-4 border-blue-500'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">Commande #{order.id}</span>
              <span className="text-sm text-gray-500">
                {new Date(order.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <ul className="mb-4">
              {order.items.map((item) => {
                const menuItem = menuItems.find((mi) => mi.id === item.id);
                return (
                  <li key={item.id}>
                    {menuItem ? menuItem.name : `Item #${item.id}`} x{item.quantity}
                  </li>
                );
              })}
            </ul>
            {order.status === 'pending' && (
              <button
                onClick={() => updateOrderStatus(order.id, 'ready')}
                className="bg-green-500 text-white px-4 py-2 rounded-full w-full flex items-center justify-center"
              >
                <Check size={16} className="mr-2" /> Marquer comme prêt
              </button>
            )}
            {order.status === 'ready' && (
              <button
                onClick={() => updateOrderStatus(order.id, 'served')}
                className="bg-blue-500 text-white px-4 py-2 rounded-full w-full flex items-center justify-center"
              >
                <Clock size={16} className="mr-2" /> Marquer comme servi
              </button>
            )}
            {order.status === 'served' && (
              <div className="text-center text-green-600 font-bold">Commande servie</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitchenView;