"use client";

import { softwareDevelopmentMCQs } from "@/constants";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Loading } from "../shared/loading";
import { cn } from "@/lib/utils";

export default function AssesmentForm({ user }: { user: User }) {
  const [isMounted, setIsMounted] = useState(false);

  const [stage, setStage] = useLocalStorage("test-key", 1);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <div className="flex items-center flex-col max-w-xl gap-10 border border-border p-10 rounded-lg transition-all duration-300 w-full">
      {stage === 1 && <StageOne setValue={setStage} user={user} />}
      {stage === 2 && <StageTwo />}
    </div>
  );
}

function StageOne({
  setValue,
  user,
}: {
  setValue: React.Dispatch<React.SetStateAction<number>>;
  user: User;
}) {
  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="font-medium text-2xl">Hey {user.username} 👋</h1>
      <p>
        Taking an assesment based on the skills you&apos;ve selected will make
        your profile be vissible to OUTSOURCERS
      </p>

      <p>
        Proceed by clicking <span className="font-bold">continue</span>!
      </p>
      <div className="flex justify-end">
        <button
          className="custom-button"
          onClick={() => {
            setValue((x: number) => x + 1);
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function StageTwo() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState(
    Array(softwareDevelopmentMCQs.length).fill(null)
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState<number | null>(null);

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < softwareDevelopmentMCQs.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    softwareDevelopmentMCQs.forEach((mcq, index) => {
      if (answers[index] === mcq.answer) {
        correctAnswers += 1;
      }
    });
    const percentageScore =
      (correctAnswers / softwareDevelopmentMCQs.length) * 100;
    setScore(percentageScore);
  };

  const handleChangeProfileState = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.put("/api/user", { visible: true });

      const request: User = data;

      if (request.visible) return router.push("/scroll");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {score === null ? (
        <>
          <div className="mb-4">
            <h2 className="font-medium text-xl mb-2">
              {softwareDevelopmentMCQs[currentQuestionIndex].question}
            </h2>
            <div className="flex flex-col gap-2">
              {softwareDevelopmentMCQs[currentQuestionIndex].options.map(
                (option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option)}
                    className={`p-2 border rounded ${
                      answers[currentQuestionIndex] === option
                        ? "bg-primary/50"
                        : ""
                    }`}
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          </div>
          <button
            onClick={nextQuestion}
            className="p-2 bg-primary text-white rounded"
          >
            {currentQuestionIndex < softwareDevelopmentMCQs.length - 1
              ? "Next"
              : "Submit"}
          </button>
        </>
      ) : (
        <div className="flex flex-col gap-3">
          <h2 className="font-medium text-xl text-center">
            Your Score: {score}%
          </h2>
          {score > 80 && <p>Your score was greater than 80% </p>}
          {score > 80 && (
            <button
              className={cn(
                "bg-primary text-white p-2 rounded flex items-center justify-center",
                {
                  "cursor-not-allowed opacity-50": isLoading,
                }
              )}
              onClick={handleChangeProfileState}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loading /> <span className="ml-2 ">Continuing</span>
                </>
              ) : (
                "Next"
              )}
            </button>
          )}
          {score < 80 && (
            <p>
              Opps! you can only proceed if your score to this assesment is more
              than 80%
            </p>
          )}
        </div>
      )}
    </div>
  );
}
