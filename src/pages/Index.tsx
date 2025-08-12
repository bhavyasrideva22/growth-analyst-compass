import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  TrendingUp, 
  Target, 
  Brain, 
  BarChart3, 
  CheckCircle, 
  Clock,
  Users,
  Award
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-secondary">
        <div className="absolute inset-0 bg-gradient-accent"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-primary border-0 text-lg px-6 py-2">
              Career Assessment Tool
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
              Should I Become a Performance Marketing Analyst?
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              Discover your fit for performance marketing through our comprehensive assessment covering psychology, technical skills, and career alignment using the proven WISCAR framework.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-primary border-0 text-lg px-8 py-6 shadow-glow hover:shadow-glow hover:scale-105 transition-all duration-300"
                onClick={() => navigate("/assessment")}
              >
                Start Assessment
                <TrendingUp className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-5 h-5 mr-2" />
                <span>20-30 minutes</span>
              </div>
            </div>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">15</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">6</div>
                <div className="text-sm text-muted-foreground">Dimensions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Personalized</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">5K+</div>
                <div className="text-sm text-muted-foreground">Assessments</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">What You'll Discover</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive assessment evaluates your potential across multiple dimensions to give you a complete picture of your career fit.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-card border-border shadow-card hover:shadow-glow transition-all duration-300">
            <CardContent className="p-8 text-center">
              <Brain className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4">Psychological Fit</h3>
              <p className="text-muted-foreground">
                Assess your personality traits, cognitive style, and motivation alignment with performance marketing roles.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border shadow-card hover:shadow-glow transition-all duration-300">
            <CardContent className="p-8 text-center">
              <BarChart3 className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4">Technical Readiness</h3>
              <p className="text-muted-foreground">
                Evaluate your analytical skills, tool familiarity, and domain knowledge for marketing analytics.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border shadow-card hover:shadow-glow transition-all duration-300">
            <CardContent className="p-8 text-center">
              <Target className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4">WISCAR Analysis</h3>
              <p className="text-muted-foreground">
                Comprehensive framework measuring Will, Interest, Skill, Cognitive readiness, Ability, and Real-world alignment.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Performance Marketing Overview */}
      <section className="py-24 bg-gradient-accent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">What is Performance Marketing?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Performance marketing is a data-driven discipline focused on measuring, optimizing, and scaling marketing campaigns to achieve specific performance metrics like conversions, ROAS, or CPA.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Data-Driven Optimization</h4>
                    <p className="text-muted-foreground">Continuously test and improve campaigns based on performance data</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Multi-Channel Management</h4>
                    <p className="text-muted-foreground">Manage PPC, social ads, affiliate, and programmatic campaigns</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">ROI-Focused Strategy</h4>
                    <p className="text-muted-foreground">Focus on measurable business outcomes and return on investment</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Typical Roles Include:</h3>
              <div className="grid gap-4">
                <Badge variant="outline" className="p-4 text-left justify-start">
                  <Users className="w-5 h-5 mr-3" />
                  Performance Marketing Analyst
                </Badge>
                <Badge variant="outline" className="p-4 text-left justify-start">
                  <Award className="w-5 h-5 mr-3" />
                  Paid Media Specialist
                </Badge>
                <Badge variant="outline" className="p-4 text-left justify-start">
                  <TrendingUp className="w-5 h-5 mr-3" />
                  Growth Marketing Specialist
                </Badge>
                <Badge variant="outline" className="p-4 text-left justify-start">
                  <BarChart3 className="w-5 h-5 mr-3" />
                  Digital Campaign Analyst
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Discover Your Career Fit?</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Take our comprehensive assessment and get personalized insights into your performance marketing potential.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-primary border-0 text-lg px-12 py-6 shadow-glow hover:shadow-glow hover:scale-105 transition-all duration-300"
            onClick={() => navigate("/assessment")}
          >
            Start Your Assessment Now
            <TrendingUp className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
