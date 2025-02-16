import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Pencil, Mail, Github, Linkedin } from "lucide-react";

export default function ProfileCard() {
  return (
    <div className="flex justify-center w-full">
      <Card className="w-full max-w-[300px] p-4 border shadow-sm">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Profile</h3>
          <Button variant="ghost" size="icon">
            <Pencil className="w-4 h-4" />
          </Button>
        </div>
        <CardContent className="flex flex-col items-center gap-4 mt-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/rohitmali.png" alt="User" />
            <AvatarFallback>RM</AvatarFallback>
          </Avatar>
          <h4 className="text-lg font-medium">Rohit Mali</h4>
          <p className="text-sm text-gray-500">MERN Stack Developer</p>
          <div className="flex gap-4 mt-2">
            <a href="mailto:rohit@example.com" className="text-gray-600 hover:text-gray-900">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://github.com/rohitmali" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/rohitmali" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <Button className="mt-4 w-full">Get your Codolio Card</Button>
        </CardContent>
      </Card>
    </div>
  );
}
