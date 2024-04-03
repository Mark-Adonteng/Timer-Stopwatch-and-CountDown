import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames'; // Import Tailwind CSS classes
import Stopwatch from './components/stopwatch';
import Timer from './components/timer';
import CountdownTimer from './components/countdownTimer';

export default function App() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [showHomeButton, setShowHomeButton] = useState<boolean>(false);

  const renderComponent = (componentName: string) => {
    setSelectedComponent(componentName);
    setShowHomeButton(true);
  };

  const handleHomeButtonClick = () => {
    setSelectedComponent(null);
    setShowHomeButton(false);
  };

  return (
    <View style={tw`flex-1 bg-white items-center justify-center`}>
      {selectedComponent === null ? (
        <View style={tw`justify-center mb-5`}>
          <View style={tw`items-center mb-5`}>
            <TouchableOpacity style={[tw`bg-blue-500 w-32 h-32 items-center justify-center`]} onPress={() => renderComponent('stopwatch')}>
              <Text style={tw`text-white`}>Stopwatch</Text>
            </TouchableOpacity>
          </View>

          <View style={tw`flex-row justify-center mb-5`}>
            <TouchableOpacity style={[tw`bg-green-500 w-32 h-32 items-center justify-center mr-5`]} onPress={() => renderComponent('timer')}>
              <Text style={tw`text-white`}>Timer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[tw`bg-red-500 w-32 h-32 items-center justify-center`]} onPress={() => renderComponent('countdownTimer')}>
              <Text style={tw`text-white`}>Countdown Timer</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={tw`flex-1 items-center justify-center`}>
          {selectedComponent === 'stopwatch' ? (
            <Stopwatch />
          ) : selectedComponent === 'timer' ? (
            <Timer />
          ) : selectedComponent === 'countdownTimer' ? (
            <CountdownTimer />
          ) : null}
          {showHomeButton && (
            <TouchableOpacity onPress={handleHomeButtonClick} style={tw`bg-gray-500 mt-5 p-2 rounded`}>
              <Text style={tw`text-white`}>Home</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}
