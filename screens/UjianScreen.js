import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function Ujian() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions] = useState([
    {
      questionText: 'Apa ibu kota Indonesia?',
      answerOptions: ['Jakarta', 'Surabaya', 'Bandung', 'Yogyakarta'],
      correctAnswer: 'Jakarta',
    },
    {
      questionText: 'Siapakah presiden pertama Indonesia?',
      answerOptions: ['Soekarno', 'Soeharto', 'Megawati', 'Jokowi'],
      correctAnswer: 'Soekarno',
    },
    // Tambahkan pertanyaan lain sesuai kebutuhan Anda
  ]);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(0);

  const handleAnswerButtonClick = (selectedOption, index) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = selectedOption;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {question.questionText}
          </Text>
          {question.answerOptions.map((option, optionIndex) => (
            <TouchableOpacity
              key={optionIndex}
              style={[
                styles.answerButton,
                {
                  backgroundColor:
                    selectedAnswers[index] === option ? 'lightgreen' : 'white',
                },
              ]}
              onPress={() => handleAnswerButtonClick(option, index)}
            >
              <Text style={styles.answerButtonText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Selesai</Text>
      </TouchableOpacity>
      {score !== null && (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Skor Anda: {score}/{questions.length}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  questionContainer: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 8,
  },
  answerButton: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgreen',
    borderRadius: 5,
  },
  answerButtonText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    color: 'white',
  },
  scoreContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
});
