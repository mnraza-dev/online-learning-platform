"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkle } from "lucide-react";

const AddNewCourseDialog = ({ children }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    chapters: 0,
    category: "",
    isVideoIncluded: false,
    difficulty_level: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVideoToggle = () => {
    setFormData((prev) => ({
      ...prev,
      isVideoIncluded: !prev.isVideoIncluded,
    }));
  };

  const handleDifficultySelect = (value) => {
    setFormData((prev) => ({
      ...prev,
      difficulty_level: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Course Generated:", formData);
    
    
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create a New Course Using AI</DialogTitle>
          <DialogDescription>
            Fill out the details below to create a new course.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter course title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Course Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a brief description..."
            />
          </div>

          <div>
            <Label htmlFor="chapters">Number of Chapters</Label>
            <Input
              id="chapters"
              name="chapters"
              type="number"
              value={formData.chapters}
              onChange={handleChange}
              placeholder="e.g. 10"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="isVideoIncluded"
              checked={formData.isVideoIncluded}
              onCheckedChange={handleVideoToggle}
            />
            <Label htmlFor="isVideoIncluded">Include Video</Label>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="difficulty_level">Difficulty Level</Label>
            <Select
              value={formData.difficulty_level}
              onValueChange={handleDifficultySelect}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Difficulty Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Web Development"
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white flex gap-2 items-center"
              size="lg"
            >
              <Sparkle className="w-4 h-4" />
              Generate Course
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCourseDialog;
