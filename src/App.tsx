import React from 'react';
import { Menu, ShoppingCart, ChefHat, LogOut } from 'lucide-react';
import CustomerOrder from './components/CustomerOrder';
import KitchenView from './components/KitchenView';
import Login from './components/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';

type View = 'customer' | 'kitchen';

function AppContent() {
  const [view, setView] = React.useState<View>('customer');
  const { user, login, logout, register } = useAuth();

  if (!user) {
    return <Login onLogin={login} onRegister={register} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Menu className="mr-2" /> Restaurant App
          </h1>
          <div className="flex items-center">
            {user.role === 'admin' && (
              <button
                onClick={() => setView(view === 'customer' ? 'kitchen' : 'customer')}
                className="bg-white text-blue-600 px-4 py-2 rounded-full flex items-center mr-4"
              >
                {view === 'customer' ? (
                  <>
                    <ChefHat className="mr-2" /> Vue Cuisine
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2" /> Vue Client
                  </>
                )}
              </button>
            )}
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center"
            >
              <LogOut className="mr-2" /> Déconnexion
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto mt-8 p-4">
        {user.role === 'admin' ? (
          view === 'customer' ? <CustomerOrder /> : <KitchenView />
        ) : (
          <CustomerOrder />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;