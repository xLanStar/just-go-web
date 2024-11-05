export interface Plan {
  id: String,
  name: String,// database沒有，要加
  is_final:boolean,// database沒有，要加
  trip_id: String,
  start_day_id: String
}

export interface Day {
  id: String,
  plan_id: String,
  start_attraction_id: String,
  next_day_id:String
}

export interface attraction {
  id: String,
  day_id: String,
  start_at: Date | null,
  end_at: Date | null,
  note: String | null,
  google_place_id: String,
  next_attraction_id: String | null
}

export interface CollectionData {
  id: string,
  google_place_id:string,
  user_id:string
}