import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import axios from "axios";
import { Loader2, PieChart as PieChartIcon, BarChart as BarChartIcon, LineChart as LineChartIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

import Footer from "../components/Footer";
import Photo from "../assets/photo.svg";
import Camera from "../assets/camera.svg";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const FoodRecommendationChart = ({ foodName, userWeek }) => {
  const [data, setData] = useState([]);
  const [animationActive, setAnimationActive] = useState(false);
  const [chartType, setChartType] = useState('pie');

  useEffect(() => {
    // Simulated data - in a real app, this would come from an API
    const simulatedData = [
      { name: '1-12주', value: Math.random() * 100 },
      { name: '13-24주', value: Math.random() * 100 },
      { name: '25-36주', value: Math.random() * 100 },
      { name: '37주 이상', value: Math.random() * 100 },
    ];
    setData(simulatedData);
    setAnimationActive(true);
  }, [foodName]);

  const getUserWeekRecommendation = () => {
    if (userWeek <= 12) return data[0]?.value.toFixed(1);
    if (userWeek <= 24) return data[1]?.value.toFixed(1);
    if (userWeek <= 36) return data[2]?.value.toFixed(1);
    return data[3]?.value.toFixed(1);
  };

  const renderChart = () => {
    switch(chartType) {
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              isAnimationActive={animationActive}
              animationBegin={0}
              animationDuration={1500}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-8 pb-10">
      <h3 className="text-lg font-semibold mb-4">임신 주차별 {foodName} 추천 비율</h3>
      <p className="mb-4 text-md font-medium">
        현재 임신 {userWeek}주차의 추천 비율: {getUserWeekRecommendation()}%
      </p>
      <div className="flex justify-end mb-2 space-x-2">
        <button onClick={() => setChartType('pie')} className="p-2 bg-blue-500 text-white rounded"><PieChartIcon size={16} /></button>
        <button onClick={() => setChartType('bar')} className="p-2 bg-green-500 text-white rounded"><BarChartIcon size={16} /></button>
        <button onClick={() => setChartType('line')} className="p-2 bg-yellow-500 text-white rounded"><LineChartIcon size={16} /></button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default function Explore() {
  const [isOpen, setIsOpen] = useState(false);
  const webcamRef = useRef();
  const fileInputRef = useRef();
  const [recognitionResult, setRecognitionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [drawerHeight, setDrawerHeight] = useState(300);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [userWeek, setUserWeek] = useState(20); // 임의의 임신 주차 (실제로는 사용자 데이터에서 가져와야 함)

  useEffect(() => {
    if (recognitionResult) {
      setIsOpen(true);
    }
  }, [recognitionResult]);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartY(e.clientY || e.touches[0].clientY);
  };

  const handleDrag = (e) => {
    if (!isDragging) return;
    const currentY = e.clientY || e.touches[0].clientY;
    const diff = startY - currentY;
    setDrawerHeight(prevHeight => Math.min(Math.max(prevHeight + diff, 300), window.innerHeight));
    setStartY(currentY);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('touchmove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);

  const handelGalleryOpen = () => {
    fileInputRef.current.click();

    fileInputRef.current.onchange = async (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const data = {
          image: reader.result,
        };
        const headers = {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzOTA0OTQ3LCJpYXQiOjE3MjMzMDQ5NDcsImp0aSI6ImYyYTlhMTc1YTMxZjQ3OTM4ZTFhMGJmZjU0NWNlMzU4IiwidXNlcl9pZCI6MX0.tK6zBLk3EZdt9u3QyDWfUS1IJ_vuDkNz3KadTmN9f1E",
        };

        try {
          setLoading(true);
          const response = await axios.post("https://ja2024.ny64.kr/api/foods/recognize/", data, { headers });
          console.log(response.data);
          setRecognitionResult(response.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
    };

    fileInputRef.current.value = "";
  };

  const handelCapture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const data = {
      image: String(imageSrc),
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzOTA0OTQ3LCJpYXQiOjE3MjMzMDQ5NDcsImp0aSI6ImYyYTlhMTc1YTMxZjQ3OTM4ZTFhMGJmZjU0NWNlMzU4IiwidXNlcl9pZCI6MX0.tK6zBLk3EZdt9u3QyDWfUS1IJ_vuDkNz3KadTmN9f1E",
    };

    try {
      setLoading(true);
      const response = await axios.post("https://ja2024.ny64.kr/api/foods/recognize/", data, { headers });
      console.log(response.data);
      setRecognitionResult(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-full">
      {loading ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center">
          <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
          <p className="mt-4 text-lg font-semibold text-gray-700">식품을 분석하고 있어요...</p>
        </div>
      ) : null}
      <input type="file" hidden ref={fileInputRef} />
      <div className="top-0 left-0 w-full h-full overflow-hidden">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: "environment",
          }}
          disablePictureInPicture={true}
          className={`absolute top-0 left-0 w-full h-full object-cover ${loading ? 'opacity-60' : ''}`}
        />
      </div>
      <div className="absolute bottom-0 mb-[15dvh] w-full">
        <div className="mx-11 flex justify-between items-center">
          <div
            className="bg-white flex items-center justify-center p-3 rounded-xl h-fit shadow-2xl cursor-pointer transform active:scale-110 transition-transform"
            onClick={handelGalleryOpen}>
            <img src={Photo} alt="사진" />
          </div>
          <div className="bg-white flex items-center justify-center p-5 rounded-full shadow-2xl cursor-pointer transform active:scale-110 transition-transform" onClick={handelCapture}>
            <img src={Camera} alt="카메라" />
          </div>
          <div className="opacity-0 p-3">
            <img src={Photo} alt="사진" />
          </div>
        </div>
      </div>
      <Drawer
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setRecognitionResult(null);
          setDrawerHeight(300);
        }}
        direction="bottom"
        className="!overflow-hidden rounded-t-[20px]"
        style={{
          height: `${drawerHeight}px`,
          transition: 'height 0.3s ease-in-out',
        }}
      >
        <div className="flex justify-center items-center pt-3 pb-5">
          <div 
            className="w-20 h-1 bg-black rounded-full cursor-grab"
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          ></div>
        </div>
        <div className="h-full overflow-y-auto px-5">
          {recognitionResult ? (
            <div className="h-fit">
              <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-bold">{recognitionResult.food_name}</span>
                </div>
              </div>
              <div className="text-lg">
                <p>is_safe: {recognitionResult.safety_info.answer.is_safe}</p>
                <p>general_safety: {recognitionResult.safety_info.answer.general_safety}</p>
                <p>nutritional_benefits: {recognitionResult.safety_info.answer.nutritional_benefits}</p>
                <p>potential_risks: {recognitionResult.safety_info.answer.potential_risks}</p>
                <p>recommended_intake: {recognitionResult.safety_info.answer.recommended_intake}</p>
                <p>preparation_advice: {recognitionResult.safety_info.answer.preparation_advice}</p>
                <p>alternatives: {recognitionResult.safety_info.answer.alternatives}</p>
              </div>
              <FoodRecommendationChart foodName={recognitionResult.food_name} userWeek={userWeek} />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-full">
              <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
              <p className="mt-4 text-lg font-semibold text-gray-700">분석 결과를 불러오는 중...</p>
            </div>
          )}
        </div>
      </Drawer>
      <Footer className="z-50" />
    </main>
  );
}