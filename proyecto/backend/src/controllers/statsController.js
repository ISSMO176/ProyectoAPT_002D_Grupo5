// statsController.js
export const getStatistics = async (req, res) => {
    try {
        const statistics = await fetchStatisticsFromDatabase();
        res.json({ success: true, data: statistics });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching statistics", error });
    }
};

async function fetchStatisticsFromDatabase() {
    // Aquí puedes realizar la lógica de obtener las estadísticas desde una base de datos
    return {
        totalPlayers: 5000,
        matchesPlayed: 12000,
    };
}
