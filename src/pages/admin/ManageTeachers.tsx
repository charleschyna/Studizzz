
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle } from 'lucide-react';

// Form schema
const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "Full name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  employeeId: z.string().min(1, {
    message: "Employee ID is required.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ManageTeachers: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      employeeId: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSuccess(false);
    
    try {
      // 1. Create the auth user with Supabase
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            role: 'teacher',
            employee_id: data.employeeId
          }
        }
      });
      
      if (signUpError) throw signUpError;
      
      // Show success notification
      toast({
        title: "Teacher account created",
        description: `Account for ${data.fullName} has been created successfully.`,
      });
      
      // Reset form and show success state
      form.reset();
      setSuccess(true);
      
    } catch (error: any) {
      console.error("Error creating teacher account:", error);
      toast({
        variant: "destructive",
        title: "Error creating account",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Teachers</h1>
        <p className="text-muted-foreground">Create and manage teacher accounts.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Teacher Account</CardTitle>
            <CardDescription>
              Add a new teacher to the system. They will receive access to their dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success && (
              <div className="bg-green-50 p-4 rounded-md flex items-center mb-6">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <p className="text-green-800 text-sm">Teacher account created successfully!</p>
              </div>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="teacher@school.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be used for login.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="employeeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee ID</FormLabel>
                      <FormControl>
                        <Input placeholder="TCH001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormDescription>
                        Teacher will be prompted to change this on first login.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : "Create Teacher Account"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Why Admin Creates Teacher Accounts</CardTitle>
            <CardDescription>
              Benefits of administrator-managed teacher accounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-base mb-1">Better Control & Security</h3>
              <p className="text-sm text-muted-foreground">
                Prevents unauthorized access and ensures only verified school staff have access to student data.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-1">Data Integrity</h3>
              <p className="text-sm text-muted-foreground">
                Admin can assign the correct full name, subjects taught, and classes handled, linking teachers directly to the correct students and data.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-1">Role Management</h3>
              <p className="text-sm text-muted-foreground">
                Admin can set permissions and deactivate accounts if a teacher leaves the school.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageTeachers;
