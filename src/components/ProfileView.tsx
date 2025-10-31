import { ArrowLeft, MessageCircle, DollarSign } from 'lucide-react';
import { Person } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfileViewProps {
  person: Person;
  onBack: () => void;
  onPlaceBid: () => void;
  onMessage: () => void;
}

export function ProfileView({ person, onBack, onPlaceBid, onMessage }: ProfileViewProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative">
        <div className="h-80 bg-gradient-to-br from-orange-300 to-pink-300 rounded-b-3xl overflow-hidden">
          <ImageWithFallback
            src={person.image}
            alt={person.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        
        <button
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl font-bold">{person.name}, {person.age}</h1>
          <p className="text-white/90">{person.auctionedBy}</p>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* About Section */}
        <section>
          <h2 className="text-xl font-semibold mb-3">About {person.name}</h2>
          <p className="text-gray-700 leading-relaxed">{person.about}</p>
        </section>

        {/* Occupation */}
        <section>
          <h3 className="font-semibold mb-2">Occupation</h3>
          <p className="text-gray-700">{person.occupation}</p>
        </section>

        {/* Pros */}
        <section>
          <h3 className="font-semibold mb-3">Pros</h3>
          <ul className="space-y-2">
            {person.pros.map((pro, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-gray-700">{pro}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Cons */}
        <section>
          <h3 className="font-semibold mb-3">Cons</h3>
          <ul className="space-y-2">
            {person.cons.map((con, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-gray-700">{con}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Interests */}
        <section>
          <h3 className="font-semibold mb-3">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {person.interests.map((interest, index) => (
              <Badge key={index} variant="secondary" className="bg-pink-100 text-pink-700">
                {interest}
              </Badge>
            ))}
          </div>
        </section>

        {/* Photo Gallery */}
        <section>
          <h3 className="font-semibold mb-3">Photo Gallery</h3>
          <div className="grid grid-cols-2 gap-3">
            {person.gallery.map((photo, index) => (
              <div key={index} className="aspect-square rounded-2xl overflow-hidden bg-gray-200">
                <ImageWithFallback
                  src={photo}
                  alt={`${person.name} photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h3 className="font-semibold mb-3">Testimonials</h3>
          <div className="space-y-4">
            {person.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <ImageWithFallback
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium">{testimonial.name}</span>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onMessage}
            className="flex-1"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Message
          </Button>
          <Button
            onClick={onPlaceBid}
            className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Place Bid
          </Button>
        </div>
      </div>
    </div>
  );
}