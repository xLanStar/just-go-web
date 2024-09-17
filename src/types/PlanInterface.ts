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
  start_at: Date,
  end_at: Date,
  note: String,
  google_place_id: String,
  next_attraction_id: String
}

//database沒有，要加
export interface transportationInfo {
  id: String,
  day_id: String,
  place_id_from: String,
  place_id_to: String,
  way: String,
  spend_time:Date
}