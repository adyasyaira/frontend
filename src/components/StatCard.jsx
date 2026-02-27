const colorMap = {
    pink: "bg-pink-100",
    blue: "bg-blue-100",
    yellow: "bg-yellow-100",
    green: "bg-green-100",
  };
  
  const iconColorMap = {
    pink: "bg-pink-200",
    blue: "bg-blue-200",
    yellow: "bg-yellow-200",
    green: "bg-green-200",
  };
  
  export default function StatCard({ title, value, icon, color }) {
    return (
      <div className={`rounded-2xl shadow-md p-6 ${colorMap[color]}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <h2 className="text-2xl font-bold mt-2">{value}</h2>
          </div>
  
          <div className={`text-3xl p-3 rounded-xl ${iconColorMap[color]}`}>
            {icon}
          </div>
        </div>
      </div>
    );
  }