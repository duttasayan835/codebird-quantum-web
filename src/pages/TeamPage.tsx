import React, { useState } from "react";
import AnimatedPage from "@/components/AnimatedPage";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin, Quote } from "lucide-react";
import Button from "@/components/atoms/Button";
import ButtonLink from "@/components/atoms/ButtonLink";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  quote: string;
  avatar: string;
  github: string;
  linkedin: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Frontend Lead",
    bio: "Alex has over 8 years of experience in frontend development, specializing in React and modern JavaScript frameworks.",
    quote: "The best code is no code at all.",
    avatar: "https://i.pravatar.cc/150?img=11",
    github: "https://github.com/alexj",
    linkedin: "https://linkedin.com/in/alexj"
  },
  {
    id: 2,
    name: "Jamie Smith",
    role: "Backend Developer",
    bio: "Jamie specializes in building scalable backend services using Node.js and Python.",
    quote: "Simple solutions to complex problems.",
    avatar: "https://i.pravatar.cc/150?img=12",
    github: "https://github.com/jamies",
    linkedin: "https://linkedin.com/in/jamies"
  },
  {
    id: 3,
    name: "Taylor Williams",
    role: "UI/UX Designer",
    bio: "Taylor brings designs to life with a focus on accessibility and user experience.",
    quote: "Design is not just what it looks like, it's how it works.",
    avatar: "https://i.pravatar.cc/150?img=13",
    github: "https://github.com/taylorw",
    linkedin: "https://linkedin.com/in/taylorw"
  },
  {
    id: 4,
    name: "Morgan Lee",
    role: "Full Stack Developer",
    bio: "Morgan is a versatile developer who handles everything from database design to frontend implementation.",
    quote: "Code is like humor. When you have to explain it, it's bad.",
    avatar: "https://i.pravatar.cc/150?img=14",
    github: "https://github.com/morganl",
    linkedin: "https://linkedin.com/in/morganl"
  },
  {
    id: 5,
    name: "Casey Rivera",
    role: "DevOps Engineer",
    bio: "Casey ensures smooth deployments and maintains our cloud infrastructure.",
    quote: "Automate everything that can be automated.",
    avatar: "https://i.pravatar.cc/150?img=15",
    github: "https://github.com/caseyr",
    linkedin: "https://linkedin.com/in/caseyr"
  },
  {
    id: 6,
    name: "Jordan Patel",
    role: "QA Specialist",
    bio: "Jordan is passionate about software quality and automated testing.",
    quote: "If debugging is the process of removing bugs, programming must be the process of putting them in.",
    avatar: "https://i.pravatar.cc/150?img=16",
    github: "https://github.com/jordanp",
    linkedin: "https://linkedin.com/in/jordanp"
  }
];

const TeamPage = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  return (
    <AnimatedPage>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold">Our Team</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Meet the talented individuals behind Codebird Club who make everything possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="overflow-hidden h-full flex flex-col bg-black/40 backdrop-blur-lg border border-white/10 hover:shadow-lg hover:shadow-primary/20 transition-all">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <div 
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${member.avatar})` }}
                    />
                  </motion.div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <Avatar className="h-16 w-16 border-2 border-white">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                
                <CardContent className="pt-6 flex-grow">
                  <h2 className="text-xl font-semibold">{member.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                  <div className="flex items-center mb-4">
                    <Quote size={16} className="text-primary mr-2 flex-shrink-0" />
                    <p className="text-sm italic text-muted-foreground">"{member.quote}"</p>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between border-t border-white/10 pt-4">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" as="a" href={member.github} target="_blank" rel="noopener noreferrer">
                      <Github size={16} />
                    </Button>
                    <Button size="sm" variant="ghost" as="a" href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin size={16} />
                    </Button>
                  </div>
                  <Button size="sm" onClick={() => openModal(member)}>Details</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {selectedMember && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedMember.name}</DialogTitle>
              <DialogDescription className="text-primary">{selectedMember.role}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <div className="flex items-start space-x-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} />
                  <AvatarFallback>{selectedMember.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="space-y-4">
                  <p>{selectedMember.bio}</p>
                  <div className="flex items-center">
                    <Quote size={20} className="text-primary mr-2 flex-shrink-0" />
                    <p className="italic">"{selectedMember.quote}"</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-4">
                <Button
                  leftIcon={<Github />}
                  as="a"
                  href={selectedMember.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Profile
                </Button>
                <Button
                  leftIcon={<Linkedin />}
                  variant="outline"
                  as="a"
                  href={selectedMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn Profile
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <Footer />
    </AnimatedPage>
  );
};

export default TeamPage;
