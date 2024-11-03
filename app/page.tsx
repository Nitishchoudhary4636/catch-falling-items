'use client';

import React, { useState, useEffect } from 'react';

// Define the structure of each falling item
type FallingItem = {
  x: number;
  y: number;
};

export default function Home() {
  // TypeScript type annotations for state
  const [playerPosition, setPlayerPosition] = useState<number>(50);
  const [fallingItems, setFallingItems] = useState<FallingItem[]>([]);
  const [score, setScore] = useState<number>(0);

  // Handle key down events for controlling the player
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && playerPosition > 0) {
        setPlayerPosition((prevPosition) => prevPosition - 5);
      } else if (event.key === 'ArrowRight' && playerPosition < 90) {
        setPlayerPosition((prevPosition) => prevPosition + 5);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPosition]);

  // Create new falling items at random intervals
  useEffect(() => {
    const createFallingItem = () => {
      setFallingItems((prevItems) => [
        ...prevItems,
        { x: Math.random() * 90, y: 0 },
      ]);
    };

    const intervalId = setInterval(createFallingItem, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Update the position of falling items
  useEffect(() => {
    const updateFallingItems = () => {
      setFallingItems((prevItems) =>
        prevItems.map((item) => ({ ...item, y: item.y + 5 }))
      );
    };

    const intervalId = setInterval(updateFallingItems, 100);
    return () => clearInterval(intervalId);
  }, []);

  // Check for collisions between player and falling items
  useEffect(() => {
    const checkCollision = () => {
      setFallingItems((prevItems) =>
        prevItems.filter((item) => {
          if (item.y > 90 && Math.abs(item.x - playerPosition) < 10) {
            setScore((prevScore) => prevScore + 1);
            return false; // Remove the item if caught
          }
          return item.y <= 100; // Keep the item if still falling
        })
      );
    };

    const intervalId = setInterval(checkCollision, 100);
    return () => clearInterval(intervalId);
  }, [playerPosition, fallingItems]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Catch the Falling Items</h1>
      <p className="mb-4">Score: {score}</p>
      <div className="relative w-full h-[500px] border border-white">
        {/* Player */}
        <div
          className="absolute bottom-0 bg-green-500 w-20 h-20"
          style={{ left: `${playerPosition}%` }}
        />
        {/* Falling Items */}
        {fallingItems.map((item, index) => (
          <div
            key={index}
            className="absolute bg-red-500 w-10 h-10"
            style={{ top: `${item.y}%`, left: `${item.x}%` }}
          />
        ))}
      </div>
    </div>
  );
}
