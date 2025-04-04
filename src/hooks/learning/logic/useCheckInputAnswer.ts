import { ChangeEvent, useState } from "react";
import { FormattedWord } from "@/types/wordType";
import { checkAnswer } from "@/utils/learningLogic/checkAnswer";

const useCheckInputAnswer = (
  word: FormattedWord,
  onNext: (isCorrect: boolean) => void
) => {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (feedback) setFeedback(null);
  };

  const handleSubmit = () => {
    const isCorrect = checkAnswer(input, word.word);

    if (isCorrect) {
      setFeedback("correct");
      setTimeout(() => {
        setInput("");
        setFeedback(null);
        onNext(true);
      }, 1000);
    } else {
      setFeedback("incorrect");
    }
  };

  return {
    input,
    feedback,
    handleInputChange,
    handleSubmit
  };
};

export default useCheckInputAnswer;
