import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import NewsDetailsScreen from './screens/NewsDetailsScreen';
import { SupabaseProvider } from './context/SupabaseContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <SupabaseProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/signup" element={<SignupScreen />} />
                <Route 
                  path="/news/:id" 
                  element={
                    <ProtectedRoute>
                      <NewsDetailsScreen />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </SupabaseProvider>
    </Provider>
  );
}

export default App;