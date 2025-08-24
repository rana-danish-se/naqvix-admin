import React, { useEffect, useState } from "react";
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from "../../services/teamService";
import TeamModal from "./TeamModal";
import { toast } from "react-toastify";

const TeamList = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await getTeamMembers();
      setTeam(res.data);
    } catch (err) {
      toast.error("Failed to fetch team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleAdd = () => {
    setSelectedMember(null);
    setModalOpen(true);
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      setLoading(true);
      await deleteTeamMember(id);
      toast.success("Deleted successfully");
      fetchTeam();
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      if (selectedMember) {
        await updateTeamMember(selectedMember._id, formData);
        toast.success("Updated successfully");
      } else {
        await createTeamMember(formData);
        toast.success("Added successfully");
      }
      setModalOpen(false);
      fetchTeam();
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Team Members</h1>
      <button onClick={handleAdd} className="mb-4 px-4 py-2 bg-green-500 text-white rounded">Add Member</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {team.map((member) => (
            <div key={member._id} className="border p-3 rounded shadow flex flex-col items-center">
              <img src={member.image} alt={member.name} className="w-24 h-24 object-cover rounded-full mb-2" />
              <h3 className="font-bold">{member.name}</h3>
              <p>{member.designation}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleEdit(member)} className="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
                <button onClick={() => handleDelete(member._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <TeamModal loading={loading} isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} member={selectedMember} />
    </div>
  );
};

export default TeamList;
