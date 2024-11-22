export interface AttractionData {
    name: string,
    address: string,
    start_time: Date | null,
    end_time: Date | null,
    phone: string | undefined,
    rating: number | undefined,
    remark: string
}

export interface DayData {
    attractions: AttractionData[]
}

export interface PlanData {
    id: String,
    name: String,
    is_final:boolean,
    trip_id: String,
    days: DayData[]
}
