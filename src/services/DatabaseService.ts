import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface Order {
  id: number;
  items: { id: number; quantity: number }[];
  status: 'pending' | 'ready' | 'served';
  timestamp: Date;
}

interface RestaurantDB extends DBSchema {
  menu: {
    key: number;
    value: MenuItem;
  };
  orders: {
    key: number;
    value: Order;
  };
}

export interface User {
  username: string;
  role: 'user' | 'admin';
}

class DatabaseService {
  private db: IDBPDatabase<RestaurantDB> | null = null;

  async init() {
    this.db = await openDB<RestaurantDB>('RestaurantDB', 1, {
      upgrade(db) {
        db.createObjectStore('menu', { keyPath: 'id' });
        db.createObjectStore('orders', { keyPath: 'id' });
      },
    });
  }

  async getMenuItems(): Promise<MenuItem[]> {
    if (!this.db) await this.init();
    return this.db!.getAll('menu');
  }

  async addMenuItem(item: MenuItem): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.put('menu', item);
  }

  async getOrders(): Promise<Order[]> {
    if (!this.db) await this.init();
    return this.db!.getAll('orders');
  }

  async addOrder(order: Order): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.put('orders', order);
  }

  async updateOrderStatus(orderId: number, status: 'pending' | 'ready' | 'served'): Promise<void> {
    if (!this.db) await this.init();
    const order = await this.db!.get('orders', orderId);
    if (order) {
      order.status = status;
      await this.db!.put('orders', order);
    }
  }

  // Méthode d'authentification simulée avec des utilisateurs codés en dur
  async authenticateUser(username: string, password: string): Promise<User | null> {
    const users: { [key: string]: { password: string; role: 'user' | 'admin' } } = {
      'admin': { password: 'admin123', role: 'admin' },
      'user': { password: 'user123', role: 'user' },
    };

    if (users[username] && users[username].password === password) {
      return { username, role: users[username].role };
    }
    return null;
  }
}

export const databaseService = new DatabaseService();