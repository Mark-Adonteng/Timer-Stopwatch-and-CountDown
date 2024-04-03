import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CountdownTimer: React.FC = () => {
  const [time, setTime] = useState<number>(60); // Initial time in seconds
  const [running, setRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCountdown = () => {
    if (!running) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // Run every 1000 milliseconds (1 second)
      setRunning(true);
    } else {
      clearInterval(intervalRef.current!);
      setRunning(false);
    }
  };

  const resetCountdown = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTime(60); // Reset time to 60 seconds
    setRunning(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        <Button title={running ? 'Pause' : 'Start'} onPress={startCountdown} />
        <Button title="Reset" onPress={resetCountdown} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 48,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default CountdownTimer;
