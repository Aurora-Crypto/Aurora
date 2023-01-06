import {
    Alert,
    Anchor,
    Button,
    Container,
    Flex,
    Modal,
    Paper,
    Text,
    TextInput,
    Title,
    createStyles
} from "@mantine/core";
import { matches, useForm } from "@mantine/form";
import { IconAlertCircle } from "@tabler/icons";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

import MainLayout from "@layouts/MainLayout";

const useStyles = createStyles((theme) => ({
    form: {
        maxWidth: 450,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: "100%"
        }
    },

    title: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: "1.75rem"
    },
    link: {
        paddingTop: 2,
        color: theme.colors[theme.primaryColor][
            theme.colorScheme === "dark" ? 4 : 6
        ],
        fontWeight: 300,
        fontSize: theme.fontSizes.sm,
        textDecoration: "none"
    }
}));

const Login = () => {
    const { classes } = useStyles();
    const [opened, setOpened] = useState(false);
    const [error, setError] = useState("");

    const form = useForm({
        initialValues: {
            email: ""
        },

        validate: {
            email: matches(
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Invalid email"
            )
        }
    });

    const submitHandler = async ({ email }: typeof form.values) => {
        const response = await signIn("email", { redirect: false, email });
        if (!response?.ok)
            setError(
                "Try again L nerd. Ratio + did it better + no bitches + yb better"
            );
    };

    return (
        <MainLayout pageTitle="Login">
            <Modal
                transition="slide-down"
                transitionDuration={600}
                transitionTimingFunction="ease"
                opened={opened}
                onClose={() => setOpened(false)}
                size="auto"
                title="Successfuly registed!"
            >
                <Text>Check your email for a magic link to sign in.</Text>
            </Modal>
            <Container size={420} mt="8rem">
                <Paper withBorder className={classes.form} radius="md" p={30}>
                    <Title
                        className={classes.title}
                        align="center"
                        mt="md"
                        mb={20}
                    >
                        Login
                    </Title>
                    {error && (
                        <Alert
                            icon={<IconAlertCircle size={16} />}
                            title="Something went wrong!"
                            color="red"
                            mt="md"
                        >
                            {error}
                        </Alert>
                    )}
                    <form onSubmit={form.onSubmit(submitHandler)}>
                        <TextInput
                            label="Email address"
                            placeholder="johndoe@email.com"
                            {...form.getInputProps("email")}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            mt="xl"
                            disabled={!form.isValid()}
                        >
                            Log in
                        </Button>
                    </form>

                    <Flex gap="xs" justify="center" align="center" mt="md">
                        <Text align="center" size="sm">
                            Don&apos;t have an account?{" "}
                        </Text>
                        <Anchor
                            component={Link}
                            href="/register"
                            className={classes.link}
                        >
                            <Text size="sm">Register</Text>
                        </Anchor>
                    </Flex>
                </Paper>
            </Container>
        </MainLayout>
    );
};

export default Login;
