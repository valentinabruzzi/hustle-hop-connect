import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { format, parseISO } from "date-fns";
import { it } from "date-fns/locale";
import { CalendarIcon, MapPin, Users, Euro } from "lucide-react";

const CompanyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { user } = useAuth();

  // Fetch jobs created by company
  const { data: jobs } = useQuery({
    queryKey: ['company-jobs', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('created_by', user?.id)
        .order('start_date', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  // Get dates with events
  const datesWithEvents = jobs?.map(job => ({
    start: parseISO(job.start_date),
    end: parseISO(job.end_date),
    job,
  })) || [];

  // Check if a date has events
  const hasEvent = (date: Date) => {
    return datesWithEvents.some(event => {
      const start = event.start;
      const end = event.end;
      return date >= start && date <= end;
    });
  };

  // Get events for selected date
  const eventsForSelectedDate = selectedDate
    ? datesWithEvents.filter(event => {
        const start = event.start;
        const end = event.end;
        return selectedDate >= start && selectedDate <= end;
      })
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <CalendarIcon className="h-8 w-8" />
              Calendario
            </h1>
            <p className="text-muted-foreground">
              Visualizza i tuoi lavori pubblicati nel calendario
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_2fr] gap-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Seleziona una Data</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={it}
                  className="rounded-md border"
                  modifiers={{
                    hasEvent: (date) => hasEvent(date),
                  }}
                  modifiersStyles={{
                    hasEvent: {
                      fontWeight: 'bold',
                      backgroundColor: 'hsl(var(--primary) / 0.2)',
                      color: 'hsl(var(--primary))',
                    },
                  }}
                />
              </CardContent>
            </Card>

            {/* Events for selected date */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate
                    ? format(selectedDate, "d MMMM yyyy", { locale: it })
                    : "Seleziona una data"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {eventsForSelectedDate.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>Nessun lavoro pubblicato per questa data</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {eventsForSelectedDate.map(({ job }) => {
                      const isExpired = new Date(job.end_date) < new Date();
                      return (
                        <Card key={job.id} className={`border-l-4 ${isExpired ? 'border-l-muted' : 'border-l-primary'}`}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-lg">{job.title}</h3>
                              <div className="flex gap-2">
                                {isExpired && <Badge variant="secondary">Concluso</Badge>}
                                {job.urgent && <Badge variant="destructive">Urgente</Badge>}
                                <Badge>{job.type}</Badge>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {job.company_name}
                            </p>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4" />
                                <span>
                                  {format(parseISO(job.start_date), "d MMM", { locale: it })} -{" "}
                                  {format(parseISO(job.end_date), "d MMM yyyy", { locale: it })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>
                                  {job.city}, {job.province}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>
                                  {job.filled_spots || 0} / {job.total_spots} posti occupati
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Euro className="h-4 w-4" />
                                <span>{job.compensation}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Legend */}
          <Card className="mt-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Legenda:</span>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-primary/20 border-2 border-primary" />
                  <span className="text-sm">Giorni con lavori</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CompanyCalendar;
