// src/pages/ProfilePage.jsx
export default function ProfilePage() {
  // TODO: ganti data `group` di bawah dengan informasi kelompok Anda yang sesungguhnya
  const group = {
    name: "Profile Kelompok 22",
    course: "Praktikum Pemrograman Perangkat Bergerak",
    class: "Shift 04",
    description: "Berikut adalah profile anggota kelompok",
    members: [
      { name: "Rhea Alya Khairunnisa", nim: "21120123130088", role: "Ketua", image: "https://api.dicebear.com/7.x/initials/svg?seed=NA1" },
      { name: "Salsabila Diva", nim: "21120123140044", role: "Anggota", image: "https://api.dicebear.com/7.x/initials/svg?seed=NA2" },
      { name: "Muhammad Reswara Suryawan", nim: "21120123140126", role: "Anggota", image: "https://api.dicebear.com/7.x/initials/svg?seed=NA3" },
      { name: "Anisa Anastasya", nim: "21120123130080", role: "Anggota", image: "https://api.dicebear.com/7.x/initials/svg?seed=NA4" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8 pb-20 md:pb-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 mb-8 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {group.name}
          </h1>
          <p className="text-blue-100 text-lg mb-4">{group.description}</p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-white font-medium">{group.course}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-white font-medium">{group.class}</p>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {group.members.map((member, index) => (
            <div
              key={member.nim}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-sm text-gray-500">NIM: {member.nim}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium
                    ${member.role === "Ketua" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>
                    {member.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Dibuat dengan cinta kelompok 22
        </p>
      </div>
    </div>
  );
}