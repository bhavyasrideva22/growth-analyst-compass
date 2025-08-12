import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { CheckCircle, AlertCircle, TrendingUp, BookOpen, Target, Brain } from "lucide-react";

interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overallScore: number;
  recommendation: "Yes" | "No" | "Maybe";
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
  alternativeRoles: string[];
}

const calculateResults = (answers: Record<string, string | number>): AssessmentResults => {
  // Psychometric Score Calculation
  const psychometricQuestions = ["interest_analytics", "interest_campaigns", "personality_detail", "personality_stress", "cognitive_analytical", "grit_persistence"];
  const psychometricScore = Math.round(
    psychometricQuestions.reduce((acc, q) => {
      const answer = answers[q] as string;
      const score = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"].indexOf(answer) + 1;
      return acc + (score * 20);
    }, 0) / psychometricQuestions.length
  );

  // Technical Score Calculation
  let technicalScore = 0;
  if (answers.math_roi === "200%") technicalScore += 25;
  if (answers.logic_optimization === "Improve landing page") technicalScore += 25;
  if (answers.analytics_knowledge === "Cost Per Action") technicalScore += 25;
  technicalScore += Math.round(((answers.tools_familiarity as number) || 0) * 2.5);

  // WISCAR Scores
  const wiscarScores = {
    will: Math.round((["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"].indexOf(answers.will_determination as string) + 1) * 20),
    interest: Math.round(((["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"].indexOf(answers.interest_analytics as string) + 1) + 
                          (["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"].indexOf(answers.interest_campaigns as string) + 1)) * 10),
    skill: Math.round((["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"].indexOf(answers.skill_learning as string) + 1) * 20),
    cognitive: answers.cognitive_attribution === "Google Search" ? 100 : 50,
    ability: Math.round((["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"].indexOf(answers.ability_feedback as string) + 1) * 20),
    realWorld: Math.round((["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"].indexOf(answers.real_world_testing as string) + 1) * 20)
  };

  const overallScore = Math.round((psychometricScore + technicalScore + Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) / 3);

  // Recommendation Logic
  let recommendation: "Yes" | "No" | "Maybe";
  if (overallScore >= 80) recommendation = "Yes";
  else if (overallScore >= 60) recommendation = "Maybe";
  else recommendation = "No";

  return {
    psychometricScore,
    technicalScore,
    wiscarScores,
    overallScore,
    recommendation,
    strengths: overallScore > 70 ? ["Data-driven mindset", "Strong analytical skills", "Good technical foundation"] : ["Growing interest in analytics", "Willingness to learn"],
    improvements: overallScore < 70 ? ["Develop technical skills", "Learn marketing tools", "Practice data analysis"] : ["Advanced attribution modeling", "Cross-channel optimization"],
    nextSteps: recommendation === "Yes" ? 
      ["Complete Google Ads certification", "Learn SQL for marketing analytics", "Practice with real campaign data"] :
      ["Start with digital marketing fundamentals", "Explore Excel/Google Sheets for analysis", "Consider marketing operations roles"],
    alternativeRoles: recommendation === "No" ? 
      ["Marketing Operations Specialist", "SEO Analyst", "Content Marketing Analyst", "Social Media Manager"] : []
  };
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || {};
  
  const results = calculateResults(answers);

  const radarData = [
    { subject: 'Will', score: results.wiscarScores.will, fullMark: 100 },
    { subject: 'Interest', score: results.wiscarScores.interest, fullMark: 100 },
    { subject: 'Skill', score: results.wiscarScores.skill, fullMark: 100 },
    { subject: 'Cognitive', score: results.wiscarScores.cognitive, fullMark: 100 },
    { subject: 'Ability', score: results.wiscarScores.ability, fullMark: 100 },
    { subject: 'Real-World', score: results.wiscarScores.realWorld, fullMark: 100 },
  ];

  const scoreData = [
    { name: 'Psychometric Fit', score: results.psychometricScore },
    { name: 'Technical Readiness', score: results.technicalScore },
    { name: 'Overall Score', score: results.overallScore },
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Your Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground">
            Performance Marketing Analyst Career Fit Analysis
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className="border-border shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Career Recommendation</CardTitle>
              <Badge 
                variant={results.recommendation === "Yes" ? "default" : results.recommendation === "Maybe" ? "secondary" : "destructive"}
                className="text-lg px-4 py-2"
              >
                {results.recommendation === "Yes" && <CheckCircle className="w-5 h-5 mr-2" />}
                {results.recommendation === "Maybe" && <AlertCircle className="w-5 h-5 mr-2" />}
                {results.recommendation === "No" && <AlertCircle className="w-5 h-5 mr-2" />}
                {results.recommendation}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Overall Confidence Score</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Your Score</span>
                    <span className="font-bold">{results.overallScore}%</span>
                  </div>
                  <Progress value={results.overallScore} className="h-3" />
                </div>
              </div>
              <div>
                <ResponsiveContainer width="100%" height={120}>
                  <BarChart data={scoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* WISCAR Framework Analysis */}
        <Card className="border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Target className="w-6 h-6 mr-2" />
              WISCAR Framework Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" fontSize={12} />
                    <PolarRadiusAxis 
                      domain={[0, 100]} 
                      tick={false}
                    />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {Object.entries(results.wiscarScores).map(([key, score]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="capitalize font-medium">{key}</span>
                      <span className="font-bold">{score}%</span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Strengths & Improvements */}
          <Card className="border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Strengths & Areas for Growth
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-green-400 mb-3">Your Strengths</h4>
                <ul className="space-y-2">
                  {results.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Areas for Improvement</h4>
                <ul className="space-y-2">
                  {results.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-center">
                      <Brain className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Learning Path</h4>
                <ol className="space-y-2">
                  {results.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              
              {results.alternativeRoles.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Alternative Career Paths</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.alternativeRoles.map((role, index) => (
                      <Badge key={index} variant="outline">{role}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate("/")}
            variant="outline"
            size="lg"
          >
            Take Assessment Again
          </Button>
          <Button 
            onClick={() => window.print()}
            className="bg-gradient-primary border-0"
            size="lg"
          >
            Save Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;