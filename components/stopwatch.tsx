import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startStopwatch = () => {
    if (!running) {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    setRunning(!running);
  };

  const resetStopwatch = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
  };

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return (
      `${minutes < 10 ? '0' : ''}${minutes}:` +
      `${seconds < 10 ? '0' : ''}${seconds}.` +
      `${centiseconds < 10 ? '0' : ''}${centiseconds}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        <Button title={running ? 'Stop' : 'Start'} onPress={startStopwatch} />
        <Button title="Reset" onPress={resetStopwatch} />
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

export default Stopwatch;
