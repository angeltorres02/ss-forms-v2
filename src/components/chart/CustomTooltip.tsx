export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-md shadow-lg">
        <p className="font-semibold text-gray-800">{`Diagnóstico ${payload[0].payload.numeroDiagnostico}`}</p>
        <p className="text-sm text-gray-600">{`Puntos: ${payload[0].value}`}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    );
  }
  return null;
};
