import { useAuth } from "@/context/AuthContext";
import { Flashcard } from "@/pages/learning/components/Flashcard";
import ListenAndType from "@/pages/learning/components/ListenAndType";
import MeaningToWord from "@/pages/learning/components/MeaningToWord";
import { updateUserWordRepetition } from "@/services/apiService";
import { FormattedWord } from "@/types/wordType";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"

const useLearningSession = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [words, setWords] = useState<FormattedWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (location.state?.words?.length) {
      const shuffled = [
        ...location.state.words
      ].sort(
        () => Math.random() - 0.5
      );
      setWords(shuffled);
    }
  }, [location.state?.words])

  const currentWord = words[currentIndex];

  
  const handleExit = () => {
    if (window.confirm("Are you sure you want to exit?")) {
      navigate("/dashboard");
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  const handleNext = async (isCorrect?: boolean) => {
    if (!currentWord || words.length === 0) return;

    const updatedWords = [...words];

    if (isCorrect && token) {
      const updatedCount = currentWord.repetitionCount + 1;
      try {
        await updateUserWordRepetition(currentWord.id, updatedCount, token);
        updatedWords[currentIndex] = {
          ...currentWord,
          repetitionCount: updatedCount,
        };
        setWords(updatedWords);
      } catch (error) {
        console.error("Error updating repetitionCount:", error);
      }
    }

    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const renderPhase = () => {
    if (!currentWord) {
      return <Typography variant="h5">Word not found</Typography>;
    }

    switch (currentWord.repetitionCount) {
      case 0:
        return (
          <Flashcard 
            word={currentWord} 
            onPrev={handlePrev}
            onNext={() => handleNext(true)} 
          />
        );
      case 1:
        return <ListenAndType word={currentWord}/>;
      case 2:
        return <MeaningToWord word={currentWord}/>;
      default:
        return null;
    }
  };

  return {
    words, currentWord,
    handlePrev, handleNext, handleExit,
    content: renderPhase()
  };
}
export default useLearningSession;