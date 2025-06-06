import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import { useAuth } from "@/context/auth-context";
import { useLogin } from "@/hooks/react-query-hooks/use-auth";
import { cn } from "@/lib/utils";
import { LoginDto, LoginSchema } from "@/schemas/auths/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

export default function LoginPage() {
  const auth = useAuth();
  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  const form = useForm<LoginDto>({
    resolver: zodResolver(LoginSchema),
  });
  const loginMutation = useLogin({
    onSuccess: () => {
      toast.success("Đăng nhập thành công");
    },
    onError: (err) => {
      toast.error(err?.message || "Đăng nhập thất bại");
    },
  });
  const onSubmit = (data: LoginDto) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        auth.loginAction(data);
        form.reset();
      },
    });
  };
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="overflow-hidden">
            <CardContent className="grid p-0">
              <Form {...form}>
                <form
                  className="p-6 md:p-8"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">Welcome back</h1>
                      <p className="text-muted-foreground text-balance">
                        Login to your Acme Inc account
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <FormInput
                        control={form.control}
                        label="Email"
                        name="email"
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormInput
                        control={form.control}
                        label="Mật khẩu"
                        name="password"
                        type="password"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Đăng nhập
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
