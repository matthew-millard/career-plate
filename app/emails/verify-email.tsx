import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
  Text,
  Button,
  Section,
} from "@react-email/components";
import tailwindConfig from "./email.tailwind.config";

interface VerifyEmailProps {
  otp: string;
  verifyUrl: string;
}

const VerifyEmail = ({ otp, verifyUrl }: VerifyEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className="bg-background font-sans">
          <Preview>Verify your email address to get started</Preview>

          <Container className="mx-auto px-2 py-20">
            <Section
              className="bg-card p-8"
              style={{ boxShadow: "0 0 0 1px #e2e8f0", borderRadius: "6px" }}
            >
              {/* Logo/Header Section */}
              <Heading className="mb-4 text-center text-2xl">
                Welcome to Career Plate! 🤘
              </Heading>

              {/* Main Content */}
              <Text className="text-foreground-muted-extra mb-6 text-center">
                Thanks for signing up to Career Plate. Please verify your email
                address by clicking the button below or using the verification
                code.
              </Text>

              {/* Primary CTA Button */}
              <Section className="mb-8 text-center">
                <Button
                  href={verifyUrl}
                  className="rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground"
                >
                  Verify Email Address
                </Button>
              </Section>

              {/* Verification Code Section */}
              <Section className="text-center">
                <Text className="text-muted-foreground mb-2">
                  Or enter this verification code:
                </Text>
                <Text
                  className="inline-block px-4 py-2 text-2xl font-medium text-foreground"
                  style={{
                    backgroundColor: "#f1f5f9",
                    borderRadius: "6px",
                  }}
                >
                  {otp}
                </Text>
              </Section>

              {/* Footer */}
              <Text className="text-muted-foreground mt-8 text-center text-sm">
                If you didn&apos;t request this email, you can safely ignore it.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

VerifyEmail.PreviewProps = {
  otp: "1RDPK4",
  verifyUrl:
    "http://localhost:3000/verify?type=sign-up&target=matt.millard@gmail.com&code=1RDPK4",
} as VerifyEmailProps;

export default VerifyEmail;
