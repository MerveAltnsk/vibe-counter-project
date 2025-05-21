import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useVibeStore } from '@/store/useVibeStore';
import { connectWallet, getCount, increment, decrement } from '@/utils/soroban';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

export default function Counter() {
  const {
    count,
    walletAddress,
    isConnected,
    isLoading,
    error,
    setCount,
    setWalletAddress,
    setIsConnected,
    setIsLoading,
    setError,
  } = useVibeStore();

  useEffect(() => {
    if (isConnected) {
      fetchCount();
    }
  }, [isConnected]);

  const fetchCount = async () => {
    try {
      setIsLoading(true);
      const currentCount = await getCount();
      setCount(currentCount);
      setError(null);
    } catch (err) {
      setError('Failed to fetch count');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      const address = await connectWallet();
      setWalletAddress(address);
      setIsConnected(true);
      setError(null);
    } catch (err) {
      setError('Failed to connect wallet');
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncrement = async () => {
    try {
      setIsLoading(true);
      const newCount = await increment();
      setCount(newCount);
      setError(null);
    } catch (err) {
      setError('Failed to increment');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrement = async () => {
    try {
      setIsLoading(true);
      const newCount = await decrement();
      setCount(newCount);
      setError(null);
    } catch (err) {
      setError('Failed to decrement');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Vibe Counter</h1>
        
        {!isConnected ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConnect}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </motion.button>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-gray-500 break-all">
              Connected: {walletAddress}
            </p>
            
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="text-6xl font-bold text-purple-600 my-8"
            >
              {count}
            </motion.div>

            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDecrement}
                className="flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                disabled={isLoading}
              >
                <MinusIcon className="w-6 h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleIncrement}
                className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                disabled={isLoading}
              >
                <PlusIcon className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-red-500"
          >
            {error}
          </motion.p>
        )}

        {isLoading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-gray-500"
          >
            Processing...
          </motion.p>
        )}
      </div>
    </motion.div>
  );
} 