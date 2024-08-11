import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight } from 'lucide-react';
import PregnantWoman from "../assets/pregnant_woman.svg";

const StyleSelector = () => {
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzOTA0OTQ3LCJpYXQiOjE3MjMzMDQ5NDcsImp0aSI6ImYyYTlhMTc1YTMxZjQ3OTM4ZTFhMGJmZjU0NWNlMzU4IiwidXNlcl9pZCI6MX0.tK6zBLk3EZdt9u3QyDWfUS1IJ_vuDkNz3KadTmN9f1E";

  useEffect(() => {
    const fetchStyles = async () => {
      setIsLoading(true);
      setError(null);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      };

      try {
        const response = await axios.get("https://ja2024.ny64.kr/api/user-styles/list-styles/", { headers });
        setStyles(response.data);
      } catch (error) {
        console.error('Error fetching styles:', error);
        setError('스타일을 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStyles();
  }, []);

  const handleContinue = () => {
    if (selectedStyle) {
      navigate('/home');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="bg-white p-4 shadow-sm">
        {/* <h1 className="text-xl font-semibold text-purple-800">대화 스타일 선택</h1> */}
      </header>

      <main className="flex-grow overflow-y-auto p-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-32 h-32 mx-auto mb-6"
        >
          <img src={PregnantWoman} alt="임신한 여자 이모지" className="w-full h-full" />
        </motion.div>

        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : (
              styles.map((style) => (
                <motion.button
                  key={style.id}
                  variants={itemVariants}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`w-full text-left bg-white rounded-lg shadow-md p-4 mb-4 transition-all duration-300 ${
                    selectedStyle === style.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <h2 className="text-lg font-medium text-gray-800">{style.name}</h2>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">선택하려면 탭하세요</span>
                    <ChevronRight className={`text-[#d3d3d3] transition-transform duration-300 ${
                      selectedStyle === style.id ? 'transform rotate-90' : ''
                    }`} />
                  </div>
                </motion.button>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="p-4">
        <motion.button
          onClick={handleContinue}
          disabled={!selectedStyle || isLoading}
          className="w-full py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          선택 완료
        </motion.button>
      </footer>
    </div>
  );
};

export default StyleSelector;