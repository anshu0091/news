import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSupabase } from '../../context/SupabaseContext';
import { MenuIcon, X, Newspaper, LogIn, LogOut, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useSupabase();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-primary-700 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Title */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold"
            aria-label="News Reader Home"
          >
            <Newspaper size={32} />
            <span className="hidden sm:inline">News Reader</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-lg hover:text-primary-200 transition-colors">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <button 
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-lg hover:text-primary-200 transition-colors"
                  aria-label="Sign out"
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="flex items-center space-x-2 text-lg hover:text-primary-200 transition-colors"
                  aria-label="Log in"
                >
                  <LogIn size={20} />
                  <span>Log In</span>
                </Link>
                <Link 
                  to="/signup" 
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 rounded-md transition-colors"
                  aria-label="Sign up"
                >
                  <User size={20} />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary-600">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="block text-xl py-2 hover:bg-primary-600 px-3 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              {isAuthenticated ? (
                <li>
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 w-full text-left text-xl py-2 hover:bg-primary-600 px-3 rounded-md"
                  >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link 
                      to="/login" 
                      className="flex items-center space-x-2 text-xl py-2 hover:bg-primary-600 px-3 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn size={20} />
                      <span>Log In</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/signup" 
                      className="flex items-center space-x-2 text-xl py-2 bg-primary-600 hover:bg-primary-500 px-3 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={20} />
                      <span>Sign Up</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;