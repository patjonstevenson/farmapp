function formatFarmsInfo({ farms, pumps, strategies }) {
    return farms.map(farm => ({
        farm_id: farm.farm_id,
        farm_name: farm.farm_name,
        farm_timezone: farm.timezone,
        pumps: pumps
            .filter(pump => pump.farm_id === farm.id)
            .map(pump => {
                const strats = strategies.filter(s => s.strategy_id === pump.strategy_id);
                const { strategy_name, strategy_id } = strats;
                return ({
                    pump_id: pump.pump_id,
                    pump_name: pump.pump_name,
                    strategy: {
                        strategy_id,
                        strategy_name,
                        tactics: strats.map(s => ({
                            tactic_id: s.tactic_id,
                            time: s.time,
                            humidity_high: s.humidity_high,
                            dryback: s.dryback
                        }))
                    }
                })
            }),


        // [
        //     {
        //         pump_name,
        //         valves: [],
        //         strategies: [{ // getStrategiesByFarmId
        //             name: '',
        //             tactics: []
        //         }]
        //     }
        // ],

    }))
}

function formatPumps(pumps) {
    return pumps.map(pump => {

    })
}

module.exports = {
    formatFarmsInfo,
    formatPumps
}