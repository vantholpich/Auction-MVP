import { useState } from 'react';
import { ArrowLeft, ImagePlus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { createFriendProfile } from '../services/friendProfileService';

interface CreateFriendProfileViewProps {
  onBack: () => void;
  onCreateProfile: () => void;
}

export function CreateFriendProfileView({ onBack, onCreateProfile }: CreateFriendProfileViewProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bio: '',
    interests: '',
    pros: '',
    cons: '',
    occupation: '',
    auctionedBy: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name || !formData.age || !formData.bio || !formData.occupation || !formData.auctionedBy) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      
      await createFriendProfile({
        name: formData.name,
        age: parseInt(formData.age),
        bio: formData.bio,
        occupation: formData.occupation,
        interests: formData.interests,
        pros: formData.pros,
        cons: formData.cons,
        auctionedBy: formData.auctionedBy
      });

      toast.success('Friend profile created successfully!');
      onCreateProfile();
    } catch (error) {
      console.error('Error creating profile:', error);
      toast.error('Failed to create profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
          <label className="block mb-2">Friend's Name *</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-pink-50 border-0 h-12 rounded-xl"
            placeholder="Enter your friend's name"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block mb-2">Age *</label>
          <Input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="bg-pink-50 border-0 h-12 rounded-xl"
            placeholder="Enter age"
            min="18"
            max="100"
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
          <label className="block mb-2">Bio *</label>
          <Textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="bg-pink-50 border-0 rounded-xl min-h-[100px] resize-none"
            placeholder="Tell us something interesting about them..."
          />
        </div>

        {/* Interests */}
        <div>
          <label className="block mb-2">Interests</label>
          <Input
            value={formData.interests}
            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
            className="bg-pink-50 border-0 h-12 rounded-xl"
            placeholder="e.g., Hiking, Cooking, Video Games..."
          />
        </div>

        {/* Pros */}
        <div>
          <label className="block mb-2">Pros</label>
          <Input
            value={formData.pros}
            onChange={(e) => setFormData({ ...formData, pros: e.target.value })}
            className="bg-pink-50 border-0 h-12 rounded-xl"
            placeholder="What are their best qualities?"
          />
        </div>

        {/* Cons */}
        <div>
          <label className="block mb-2">Cons</label>
          <Input
            value={formData.cons}
            onChange={(e) => setFormData({ ...formData, cons: e.target.value })}
            className="bg-pink-50 border-0 h-12 rounded-xl"
            placeholder="Be honest, but kind!"
          />
        </div>

        {/* Occupation */}
        <div>
          <label className="block mb-2">Occupation *</label>
          <Input
            value={formData.occupation}
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            className="bg-pink-50 border-0 h-12 rounded-xl"
            placeholder="What do they do for work?"
          />
        </div>

        {/* Auctioned By */}
        <div>
          <label className="block mb-2">Your Name *</label>
          <Input
            value={formData.auctionedBy}
            onChange={(e) => setFormData({ ...formData, auctionedBy: e.target.value })}
            className="bg-pink-50 border-0 h-12 rounded-xl"
            placeholder="Who's listing this friend?"
          />
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full h-14 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 rounded-full disabled:opacity-50"
        >
          {isSubmitting ? 'Creating Profile...' : 'Create Friend Profile'}
        </Button>
      </div>
    </div>
  );
}
