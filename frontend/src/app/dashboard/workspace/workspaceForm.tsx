"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  url: z.string().url("Invalid URL"),
  headers: z.string().refine((val) => {
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }, "Headers must be a valid JSON object"),
  payload: z.string().refine((val) => {
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }, "Payload must be a valid JSON object"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function ApiRequestForm() {
  const { data: session } = useSession();
  const userID = session?.user.id;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      method: "GET",
      headers: "{}",
      payload: "{}",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/submit/user-api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          user_id: userID,
        }),
      });

      const ResponseData = await response.json();
      if (ResponseData.success) {
        toast.success("API request submitted successfully!");
        router.push("/dashboard/all-apis");
      } else {
        toast.error("Failed to submit API request!");
      }
    } catch (error) {
      console.error("Error submitting API request:", error);
      toast.error("Unable to submit the request. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto my-4">
      <CardHeader>
        <CardTitle>API Request Form</CardTitle>
        <CardDescription>Enter your API request details below.</CardDescription>
      </CardHeader>
      <Separator className="w-11/12 mx-auto"/>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormDescription>
                    A descriptive name for your API request.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="Enter request name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormDescription>
                    A brief description of what this API request does.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the purpose of this API request"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormLabel>Method and Endpoint</FormLabel>
            <FormDescription>
              Select the HTTP method and enter the full URL of your API
              endpoint.
            </FormDescription>
            <div className="grid grid-cols-[auto_1fr] gap-2">
              <FormField
                control={form.control}
                name="method"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="GET" className="text-green-600">
                          GET
                        </SelectItem>
                        <SelectItem value="POST" className="text-blue-600">
                          POST
                        </SelectItem>
                        <SelectItem value="PUT" className="text-yellow-600">
                          PUT
                        </SelectItem>
                        <SelectItem value="DELETE" className="text-red-600">
                          DELETE
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        placeholder="https://api.example.com/endpoint"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="headers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Headers</FormLabel>
                  <FormDescription>
                    Enter headers as a JSON object.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder='{"Content-Type": "application/json"}'
                      className="font-mono"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payload"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payload</FormLabel>
                  <FormDescription>
                    Enter payload as a JSON object.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder='{"key": "value"}'
                      className="font-mono"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
