export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          applied_at: string
          id: string
          is_invitation: boolean | null
          job_id: string
          message: string | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          applied_at?: string
          id?: string
          is_invitation?: boolean | null
          job_id: string
          message?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          applied_at?: string
          id?: string
          is_invitation?: boolean | null
          job_id?: string
          message?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      certifications: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "certifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          created_at: string
          file_url: string | null
          id: string
          signed: boolean | null
          signed_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_url?: string | null
          id?: string
          signed?: boolean | null
          signed_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_url?: string | null
          id?: string
          signed?: boolean | null
          signed_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          file_name: string
          file_url: string
          id: string
          status: string | null
          type: string
          uploaded_at: string
          user_id: string
        }
        Insert: {
          file_name: string
          file_url: string
          id?: string
          status?: string | null
          type: string
          uploaded_at?: string
          user_id: string
        }
        Update: {
          file_name?: string
          file_url?: string
          id?: string
          status?: string | null
          type?: string
          uploaded_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          company: string
          created_at: string
          description: string | null
          id: string
          period: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company: string
          created_at?: string
          description?: string | null
          id?: string
          period: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string | null
          id?: string
          period?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "experiences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      feedbacks: {
        Row: {
          comment: string | null
          company_id: string
          created_at: string
          id: string
          job_id: string
          rating: number
          user_id: string
        }
        Insert: {
          comment?: string | null
          company_id: string
          created_at?: string
          id?: string
          job_id: string
          rating: number
          user_id: string
        }
        Update: {
          comment?: string | null
          company_id?: string
          created_at?: string
          id?: string
          job_id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedbacks_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedbacks_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedbacks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery_photos: {
        Row: {
          created_at: string
          id: string
          is_profile_picture: boolean | null
          photo_url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_profile_picture?: boolean | null
          photo_url: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_profile_picture?: boolean | null
          photo_url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_photos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          benefits: string | null
          city: string
          company_name: string
          compensation: string
          created_at: string
          created_by: string | null
          description: string
          dress_code: string | null
          duration: string
          end_date: string
          filled_spots: number | null
          id: string
          province: string
          requirements: string | null
          start_date: string
          title: string
          total_spots: number
          type: Database["public"]["Enums"]["job_type"]
          updated_at: string
          urgent: boolean | null
        }
        Insert: {
          benefits?: string | null
          city: string
          company_name: string
          compensation: string
          created_at?: string
          created_by?: string | null
          description: string
          dress_code?: string | null
          duration: string
          end_date: string
          filled_spots?: number | null
          id?: string
          province: string
          requirements?: string | null
          start_date: string
          title: string
          total_spots: number
          type: Database["public"]["Enums"]["job_type"]
          updated_at?: string
          urgent?: boolean | null
        }
        Update: {
          benefits?: string | null
          city?: string
          company_name?: string
          compensation?: string
          created_at?: string
          created_by?: string | null
          description?: string
          dress_code?: string | null
          duration?: string
          end_date?: string
          filled_spots?: number | null
          id?: string
          province?: string
          requirements?: string | null
          start_date?: string
          title?: string
          total_spots?: number
          type?: Database["public"]["Enums"]["job_type"]
          updated_at?: string
          urgent?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      languages: {
        Row: {
          created_at: string
          id: string
          level: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          level: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          level?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "languages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          link: string | null
          message: string
          read: boolean | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          link?: string | null
          message: string
          read?: boolean | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          link?: string | null
          message?: string
          read?: boolean | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_holder: string | null
          available_for_travel: boolean | null
          avatar_url: string | null
          average_rating: number | null
          bank_name: string | null
          bio: string | null
          birth_date: string | null
          birth_place: string | null
          city: string | null
          completed_jobs: number | null
          country: string | null
          created_at: string
          email_notifications: boolean | null
          eye_color: string | null
          facebook: string | null
          first_name: string | null
          fiscal_code: string | null
          hair_color: string | null
          hair_length: string | null
          has_driving_license: boolean | null
          has_own_car: boolean | null
          height: number | null
          iban: string | null
          id: string
          instagram: string | null
          job_search_radius: number | null
          last_name: string | null
          linkedin: string | null
          notify_applications: boolean | null
          notify_feedback: boolean | null
          notify_invitations: boolean | null
          notify_new_jobs: boolean | null
          phone: string | null
          piercings: boolean | null
          postal_code: string | null
          profile_active: boolean | null
          province: string | null
          push_notifications: boolean | null
          shoe_size: string | null
          size: string | null
          street: string | null
          swift_bic: string | null
          tattoos: boolean | null
          tiktok: string | null
          total_reviews: number | null
          updated_at: string
          weight: number | null
        }
        Insert: {
          account_holder?: string | null
          available_for_travel?: boolean | null
          avatar_url?: string | null
          average_rating?: number | null
          bank_name?: string | null
          bio?: string | null
          birth_date?: string | null
          birth_place?: string | null
          city?: string | null
          completed_jobs?: number | null
          country?: string | null
          created_at?: string
          email_notifications?: boolean | null
          eye_color?: string | null
          facebook?: string | null
          first_name?: string | null
          fiscal_code?: string | null
          hair_color?: string | null
          hair_length?: string | null
          has_driving_license?: boolean | null
          has_own_car?: boolean | null
          height?: number | null
          iban?: string | null
          id: string
          instagram?: string | null
          job_search_radius?: number | null
          last_name?: string | null
          linkedin?: string | null
          notify_applications?: boolean | null
          notify_feedback?: boolean | null
          notify_invitations?: boolean | null
          notify_new_jobs?: boolean | null
          phone?: string | null
          piercings?: boolean | null
          postal_code?: string | null
          profile_active?: boolean | null
          province?: string | null
          push_notifications?: boolean | null
          shoe_size?: string | null
          size?: string | null
          street?: string | null
          swift_bic?: string | null
          tattoos?: boolean | null
          tiktok?: string | null
          total_reviews?: number | null
          updated_at?: string
          weight?: number | null
        }
        Update: {
          account_holder?: string | null
          available_for_travel?: boolean | null
          avatar_url?: string | null
          average_rating?: number | null
          bank_name?: string | null
          bio?: string | null
          birth_date?: string | null
          birth_place?: string | null
          city?: string | null
          completed_jobs?: number | null
          country?: string | null
          created_at?: string
          email_notifications?: boolean | null
          eye_color?: string | null
          facebook?: string | null
          first_name?: string | null
          fiscal_code?: string | null
          hair_color?: string | null
          hair_length?: string | null
          has_driving_license?: boolean | null
          has_own_car?: boolean | null
          height?: number | null
          iban?: string | null
          id?: string
          instagram?: string | null
          job_search_radius?: number | null
          last_name?: string | null
          linkedin?: string | null
          notify_applications?: boolean | null
          notify_feedback?: boolean | null
          notify_invitations?: boolean | null
          notify_new_jobs?: boolean | null
          phone?: string | null
          piercings?: boolean | null
          postal_code?: string | null
          profile_active?: boolean | null
          province?: string | null
          push_notifications?: boolean | null
          shoe_size?: string | null
          size?: string | null
          street?: string | null
          swift_bic?: string | null
          tattoos?: boolean | null
          tiktok?: string | null
          total_reviews?: number | null
          updated_at?: string
          weight?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "dipendente" | "azienda"
      application_status:
        | "pending"
        | "accepted"
        | "rejected"
        | "confirmed"
        | "completed"
      job_type:
        | "hostess"
        | "steward"
        | "promoter"
        | "modella"
        | "modello"
        | "attore"
        | "attrice"
        | "cantante"
        | "musicista"
        | "ballerino"
        | "ballerina"
        | "fotografo"
        | "videomaker"
        | "grafico"
        | "web_designer"
        | "programmatore"
        | "social_media_manager"
        | "copywriter"
        | "traduttore"
        | "cameriere"
        | "barista"
        | "cuoco"
        | "receptionist"
        | "addetto_vendite"
        | "magazziniere"
        | "autista"
        | "rider"
        | "baby_sitter"
        | "dog_sitter"
        | "personal_trainer"
        | "estetista"
        | "parrucchiere"
        | "make_up_artist"
        | "interprete"
        | "guida_turistica"
        | "animatore"
        | "dj"
        | "altro"
      notification_type:
        | "job_offer"
        | "application_status"
        | "invitation"
        | "feedback"
        | "general"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "dipendente", "azienda"],
      application_status: [
        "pending",
        "accepted",
        "rejected",
        "confirmed",
        "completed",
      ],
      job_type: [
        "hostess",
        "steward",
        "promoter",
        "modella",
        "modello",
        "attore",
        "attrice",
        "cantante",
        "musicista",
        "ballerino",
        "ballerina",
        "fotografo",
        "videomaker",
        "grafico",
        "web_designer",
        "programmatore",
        "social_media_manager",
        "copywriter",
        "traduttore",
        "cameriere",
        "barista",
        "cuoco",
        "receptionist",
        "addetto_vendite",
        "magazziniere",
        "autista",
        "rider",
        "baby_sitter",
        "dog_sitter",
        "personal_trainer",
        "estetista",
        "parrucchiere",
        "make_up_artist",
        "interprete",
        "guida_turistica",
        "animatore",
        "dj",
        "altro",
      ],
      notification_type: [
        "job_offer",
        "application_status",
        "invitation",
        "feedback",
        "general",
      ],
    },
  },
} as const
