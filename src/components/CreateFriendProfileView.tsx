import { useState } from 'react';
import { ArrowLeft, ImagePlus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';

interface CreateFriendProfileViewProps {
  onBack: () => void;
  onCreateProfile: () => void;
}

export function CreateFriendProfileView({ onBack, onCreateProfile }: CreateFriendProfileViewProps) {
  const [formData, setFormData] = useState({
    name: 'Alex Doe',
    age: '28',
    bio: 'Tell us something interesting about them...',
    interests: 'e.g., Hiking, Cooking, Video Games...',
    pros: 'What are their best qualities?',
    cons: 'Be honest, but kind!',
    occupation: 'What do they do for work?',
  });

  const handleSubmit = () => {
    toast.success('Friend profile created successfully!');
    onCreateProfile();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center mr-10">List Your Friend</h1>
      </div>

      {/* Form Content */}
      <div className="px-6 py-6 space-y-6">
        <div>
          <h2>Create Their Profile</h2>
          <p className="text-gray-500 mt-2">
            Fill in the details below to create an awesome profile for your friend.
          </p>
        </div>

        {/* Friend's Name */}
        <div>
          <label className="block mb-2">Friend's Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-pink-50 border-0 h-12 rounded-xl"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block mb-2">Age</label>
          <Input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="bg-pink-50 border-0 h-12 rounded-xl"
          />
        </div>

        {/* Photos */}
        <div>
          <label className="block mb-2">Photos</label>
          <p className="text-sm text-gray-500 mb-3">
            Add up to 6 photos. The first one will be their main profile picture.
          </p>
          <div className="grid grid-cols-3 gap-3">
            <button className="aspect-square bg-pink-50 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-pink-100 transition-colors">
              <ImagePlus className="w-8 h-8 text-pink-600" />
              <span className="text-sm text-pink-600">Add Photo</span>
            </button>
            <div className="aspect-square bg-pink-50 rounded-2xl flex items-center justify-center">
              <ImagePlus className="w-8 h-8 text-pink-300" />
            </div>
            <div className="aspect-square bg-pink-50 rounded-2xl flex items-center justify-center">
              <ImagePlus className="w-8 h-8 text-pink-300" />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block mb-2">Bio</label>
          <Textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="bg-pink-50 border-0 rounded-xl min-h-[100px] resize-none"
          />
        </div>

        {/* Interests */}
        <div>
          <label className="block mb-2">Interests</label>
          <Input
            value={formData.interests}
            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
            className="bg-pink-50 border-0 h-12 rounded-xl"
          />
        </div>

        {/* Pros */}
        <div>
          <label className="block mb-2">Pros</label>
          <Input
            value={formData.pros}
            onChange={(e) => setFormData({ ...formData, pros: e.target.value })}
            className="bg-pink-50 border-0 h-12 rounded-xl"
          />
        </div>

        {/* Cons */}
        <div>
          <label className="block mb-2">Cons</label>
          <Input
            value={formData.cons}
            onChange={(e) => setFormData({ ...formData, cons: e.target.value })}
            className="bg-pink-50 border-0 h-12 rounded-xl"
          />
        </div>

        {/* Occupation */}
        <div>
          <label className="block mb-2">Occupation</label>
          <Input
            value={formData.occupation}
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            className="bg-pink-50 border-0 h-12 rounded-xl"
          />
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full h-14 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 rounded-full"
        >
          Create Friend Profile
        </Button>
      </div>
    </div>
  );
}
