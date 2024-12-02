export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      events: {
        Row: {
          created_at: string
          creator: string | null
          end_datetime: string | null
          get_together: number | null
          id: number
          is_idea: boolean | null
          name: string | null
          start_datetime: string | null
        }
        Insert: {
          created_at?: string
          creator?: string | null
          end_datetime?: string | null
          get_together?: number | null
          id?: number
          is_idea?: boolean | null
          name?: string | null
          start_datetime?: string | null
        }
        Update: {
          created_at?: string
          creator?: string | null
          end_datetime?: string | null
          get_together?: number | null
          id?: number
          is_idea?: boolean | null
          name?: string | null
          start_datetime?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_get_together_fkey"
            columns: ["get_together"]
            isOneToOne: false
            referencedRelation: "get_togethers"
            referencedColumns: ["id"]
          },
        ]
      }
      get_together_requests: {
        Row: {
          created_at: string
          get_together: number | null
          id: number
          is_accepted: boolean | null
          responded_at: string | null
          user: string | null
        }
        Insert: {
          created_at?: string
          get_together?: number | null
          id?: number
          is_accepted?: boolean | null
          responded_at?: string | null
          user?: string | null
        }
        Update: {
          created_at?: string
          get_together?: number | null
          id?: number
          is_accepted?: boolean | null
          responded_at?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "get_together_requests_get_together_fkey"
            columns: ["get_together"]
            isOneToOne: false
            referencedRelation: "get_togethers"
            referencedColumns: ["id"]
          },
        ]
      }
      get_togethers: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          from_date: string | null
          id: number
          name: string | null
          owner: string | null
          participants: string[] | null
          state: string | null
          to_date: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          from_date?: string | null
          id?: number
          name?: string | null
          owner?: string | null
          participants?: string[] | null
          state?: string | null
          to_date?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          from_date?: string | null
          id?: number
          name?: string | null
          owner?: string | null
          participants?: string[] | null
          state?: string | null
          to_date?: string | null
        }
        Relationships: []
      }
      meals: {
        Row: {
          content: Json | null
          created_at: string
          date: string | null
          get_together: number | null
          id: number
          type: Database["public"]["Enums"]["meal_type"] | null
        }
        Insert: {
          content?: Json | null
          created_at?: string
          date?: string | null
          get_together?: number | null
          id?: number
          type?: Database["public"]["Enums"]["meal_type"] | null
        }
        Update: {
          content?: Json | null
          created_at?: string
          date?: string | null
          get_together?: number | null
          id?: number
          type?: Database["public"]["Enums"]["meal_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "meals_get_together_fkey"
            columns: ["get_together"]
            isOneToOne: false
            referencedRelation: "get_togethers"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
      votes: {
        Row: {
          created_at: string
          event: number | null
          id: number
          user: string | null
          value: string | null
        }
        Insert: {
          created_at?: string
          event?: number | null
          id?: number
          user?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string
          event?: number | null
          id?: number
          user?: string | null
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "votes_event_fkey"
            columns: ["event"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      meal_type: "breakfast" | "lunch" | "dinner"
      vote_value: "up" | "down"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
