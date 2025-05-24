
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from "@/hooks/useEvents";
import { Plus, Edit, Trash2, Save, X, Calendar, MapPin, Users } from "lucide-react";

export const EventsManagement = () => {
  const { data: events, isLoading } = useEvents();
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    max_participants: "",
    image_url: "",
    status: "upcoming"
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      location: "",
      max_participants: "",
      image_url: "",
      status: "upcoming"
    });
    setEditingEvent(null);
    setShowCreateForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
      date: new Date(formData.date).toISOString()
    };

    if (editingEvent) {
      await updateEvent.mutateAsync({ id: editingEvent.id, ...eventData });
    } else {
      await createEvent.mutateAsync(eventData);
    }
    
    resetForm();
  };

  const handleEdit = (event: any) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || "",
      date: new Date(event.date).toISOString().slice(0, 16),
      location: event.location || "",
      max_participants: event.max_participants?.toString() || "",
      image_url: event.image_url || "",
      status: event.status
    });
    setShowCreateForm(true);
  };

  if (isLoading) {
    return <div className="text-white">Loading events...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Events Management</h2>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-cyan-500 to-purple-500"
        >
          <Plus className="mr-2" size={16} />
          Add Event
        </Button>
      </div>

      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="p-6 bg-black/40 backdrop-blur-xl border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  {editingEvent ? "Edit Event" : "Create New Event"}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetForm}
                  className="text-white hover:bg-white/10"
                >
                  <X size={16} />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-white">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="bg-black/40 border-white/20 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="date" className="text-white">Date & Time</Label>
                    <Input
                      id="date"
                      type="datetime-local"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="bg-black/40 border-white/20 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location" className="text-white">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="bg-black/40 border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="max_participants" className="text-white">Max Participants</Label>
                    <Input
                      id="max_participants"
                      type="number"
                      value={formData.max_participants}
                      onChange={(e) => setFormData({...formData, max_participants: e.target.value})}
                      className="bg-black/40 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-black/40 border-white/20 text-white min-h-[100px]"
                  />
                </div>

                <div>
                  <Label htmlFor="image_url" className="text-white">Image URL</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    className="bg-black/40 border-white/20 text-white"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={createEvent.isPending || updateEvent.isPending}
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                >
                  <Save className="mr-2" size={16} />
                  {editingEvent ? "Update Event" : "Create Event"}
                </Button>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4">
        {events?.map((event: any, index: number) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 bg-black/40 backdrop-blur-xl border-white/20">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-xl font-bold text-white">{event.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === "upcoming" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                      event.status === "ongoing" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                      event.status === "completed" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                      "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  
                  <p className="text-white/70 mb-4">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date(event.date).toLocaleString()}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{event.location}</span>
                      </div>
                    )}
                    {event.max_participants && (
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{event.current_participants || 0}/{event.max_participants}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(event)}
                    className="text-cyan-400 hover:bg-cyan-400/10"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteEvent.mutate(event.id)}
                    className="text-red-400 hover:bg-red-400/10"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
