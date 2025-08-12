import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Question {
  id: string;
  type: "radio" | "slider" | "likert";
  question: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

const questions: Question[] = [
  // Psychometric Section
  {
    id: "interest_analytics",
    type: "likert",
    question: "How interested are you in analyzing data to drive marketing decisions?",
  },
  {
    id: "interest_campaigns",
    type: "likert", 
    question: "How excited would you be to optimize paid advertising campaigns daily?",
  },
  {
    id: "personality_detail",
    type: "likert",
    question: "I pay close attention to details and rarely make careless mistakes.",
  },
  {
    id: "personality_stress",
    type: "likert",
    question: "I remain calm and composed when campaigns aren't performing well.",
  },
  {
    id: "cognitive_analytical",
    type: "likert",
    question: "I prefer making decisions based on data rather than intuition.",
  },
  {
    id: "grit_persistence",
    type: "likert",
    question: "I continue working on difficult problems even when progress is slow.",
  },
  
  // Technical Section
  {
    id: "math_roi",
    type: "radio",
    question: "If you spend $1000 on ads and generate $3000 in revenue, what's your ROI?",
    options: ["200%", "300%", "33%", "66%"]
  },
  {
    id: "logic_optimization",
    type: "radio",
    question: "Your campaign has a high click-through rate but low conversions. What should you focus on first?",
    options: ["Increase ad spend", "Improve landing page", "Change ad creative", "Target new audiences"]
  },
  {
    id: "tools_familiarity",
    type: "slider",
    question: "Rate your familiarity with digital advertising tools (Google Ads, Facebook Ads, etc.)",
    min: 0,
    max: 10,
    step: 1
  },
  {
    id: "analytics_knowledge",
    type: "radio",
    question: "What does CPA stand for in performance marketing?",
    options: ["Cost Per Action", "Customer Profile Analysis", "Campaign Performance Analytics", "Conversion Path Attribution"]
  },
  
  // WISCAR Framework
  {
    id: "will_determination",
    type: "likert",
    question: "I'm willing to spend weeks testing and iterating to improve campaign performance.",
  },
  {
    id: "skill_learning",
    type: "likert",
    question: "I can quickly learn new marketing tools and platforms.",
  },
  {
    id: "cognitive_attribution",
    type: "radio",
    question: "A customer sees your ad on Facebook, clicks it, but converts 3 days later via Google search. Using last-click attribution, which channel gets credit?",
    options: ["Facebook", "Google Search", "Both equally", "Neither"]
  },
  {
    id: "ability_feedback",
    type: "likert",
    question: "I actively seek feedback and use it to improve my performance.",
  },
  {
    id: "real_world_testing",
    type: "likert",
    question: "I would enjoy running A/B tests and analyzing which variations perform better.",
  }
];

const likertOptions = [
  "Strongly Disagree",
  "Disagree", 
  "Neutral",
  "Agree",
  "Strongly Agree"
];

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const navigate = useNavigate();

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string | number) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Navigate to results with answers
      navigate("/results", { state: { answers } });
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const currentAnswer = answers[currentQuestionData.id];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Performance Marketing Assessment</h1>
          <p className="text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</p>
          <Progress value={progress} className="mt-4 h-2" />
        </div>

        {/* Question Card */}
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-xl">{currentQuestionData.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentQuestionData.type === "radio" && (
              <RadioGroup 
                value={currentAnswer as string || ""} 
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {currentQuestionData.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestionData.type === "likert" && (
              <RadioGroup 
                value={currentAnswer as string || ""} 
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {likertOptions.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`likert-${index}`} />
                    <Label htmlFor={`likert-${index}`} className="cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestionData.type === "slider" && (
              <div className="space-y-4">
                <div className="px-3">
                  <Slider
                    value={[currentAnswer as number || 0]}
                    onValueChange={(value) => handleAnswer(value[0])}
                    min={currentQuestionData.min || 0}
                    max={currentQuestionData.max || 10}
                    step={currentQuestionData.step || 1}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{currentQuestionData.min || 0}</span>
                  <span className="font-medium">Current: {currentAnswer || 0}</span>
                  <span>{currentQuestionData.max || 10}</span>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button 
                onClick={nextQuestion}
                disabled={!currentAnswer}
                className="bg-gradient-primary border-0"
              >
                {currentQuestion === questions.length - 1 ? "Get Results" : "Next"}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;