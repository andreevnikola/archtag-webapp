import {
    ButtonCustomizationType,
    CustomForm,
    Field,
    FieldGroup,
} from "@/components/lib/form/CustomForm";
import { faUserEdit, faKey } from "@fortawesome/free-solid-svg-icons";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuthenticationStore } from "@/stores/AuthenticationStore";
import { useUserStore } from "@/stores/UserStore";
import { Request } from "@/lib/requestr";
import { updateUserData, revalidateToken } from "@/lib/authenticationUtils";

// Define the form interfaces and fields directly here
interface IProfileForm {
    firstname: string;
    lastname: string;
    email: string;
}

interface IPasswordForm {
    currentPassword: string;
    password: string;
}

const profileFormFields: Array<Field | FieldGroup> = [
    {
        name: "names",
        fields: [
            {
                name: "firstname",
                type: "text",
                title: "Име",
                placeholder: "Георги",
                validation: (value: string) => value.length > 2 && value.length < 20,
                errorMessage: "Моля въведете валидно име!",
            },
            {
                name: "lastname",
                type: "text",
                title: "Фамилия",
                placeholder: "Иванов",
                validation: (value: string) => value.length > 3 && value.length < 20,
                errorMessage: "Моля въведете валидна фамилия!",
            },
        ],
    },
    {
        name: "email",
        type: "text",
        title: "Имейл",
        placeholder: "georgiivanov@work.com",
        validation: (value: string) =>
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                value
            ) && value.length < 50,
        errorMessage: "Моля въведете валиден имейл!",
    },
];

const passwordFormFields: Array<Field | FieldGroup> = [
    {
        name: "currentPassword",
        type: "password",
        title: "Текуща Парола",
        placeholder: "*********",
        validation: (value: string) => value.length > 5 && value.length < 21,
        errorMessage: "Паролата трябва да е между 6 и 20 символа!",
    },
    {
        name: "password",
        type: "password",
        title: "Нова Парола",
        placeholder: "*********",
        validation: (value: string) => value.length > 5 && value.length < 21,
        errorMessage: "Паролата трябва да е между 6 и 20 символа!",
    },
];

export const Route = createFileRoute("/_authenticated/account")({
    component: AccountPage,
});

function AccountPage() {
    const token = useAuthenticationStore((state) => state.token);
    const { firstname, lastname, email } = useUserStore((state) => ({
        firstname: state.firstname,
        lastname: state.lastname,
        email: state.email,
    }));
    const [defaultData, setDefaultData] = useState<IProfileForm | null>(null);
    const [passwordFormData, setPasswordFormData] = useState<IPasswordForm>({ currentPassword: "", password: "" });
    const [passwordFormKey, setPasswordFormKey] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                setError("No token provided");
                setIsLoading(false);
                return;
            }

            try {
                await updateUserData();
                const userData = {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                };
                setDefaultData(userData);
            } catch (err) {
                setError("Failed to fetch user data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [token, firstname, lastname, email]);

    const handleProfileSubmit = async (data: IProfileForm) => {
        const req = Request.builder<IProfileForm, any>()
            .method("POST")
            .url(`/auth/update-account`)
            .headers({
                Authorization: `Bearer ${token}`,
            })
            .body(data)
            .build();

        const { res, error } = await req.send();

        if (error) {
            setError(error.message);
            setSuccessMessage(null);
        } else {
            setSuccessMessage("Профилът беше обновен успешно!");
            setError(null);
            console.log("Profile updated successfully");
            await revalidateToken(); // Revalidate token after updating profile
            await updateUserData();
        }
    };

    const handlePasswordSubmit = async (data: IPasswordForm) => {
        const req = Request.builder<Partial<IProfileForm> & IPasswordForm, any>()
            .method("POST")
            .url(`/auth/update-account`)
            .headers({
                Authorization: `Bearer ${token}`,
            })
            .body({
                email,
                currentPassword: data.currentPassword,
                password: data.password,
            })
            .build();

        const { res, error } = await req.send();

        if (error) {
            setError("Грешна парола!");
            setSuccessMessage(null);
        } else {
            setSuccessMessage("Паролата беше променена успешно!");
            setError(null);
            setPasswordFormData({ currentPassword: "", password: "" }); // Clear the password fields only after success
            setPasswordFormKey(passwordFormKey + 1); // Reset the form to clear fields
            console.log("Password updated successfully");
            await revalidateToken(); // Revalidate token after updating password
            await updateUserData();
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-6 w-full">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
                Управление на акаунта
            </h1>

            {isLoading ? (
                <p>Зареждане...</p>
            ) : (
                <>
                    {successMessage && (
                        <p className="text-green-500">{successMessage}</p>
                    )}
                    {error && (
                        <p className="text-red-500">{error}</p>
                    )}
                    {defaultData && (
                        <>
                            <CustomForm<IProfileForm>
                                onSubmit={handleProfileSubmit}
                                fields={profileFormFields}
                                submitButtonType={ButtonCustomizationType.CUSTOM_TEXT_AND_ICON}
                                submitButton={{
                                    icon: faUserEdit,
                                    text: "Запази промените",
                                    size: "full",
                                }}
                                initialData={defaultData}
                                isLoading={false}
                            />
                            <CustomForm<IPasswordForm>
                                key={passwordFormKey}
                                onSubmit={handlePasswordSubmit}
                                fields={passwordFormFields}
                                submitButtonType={ButtonCustomizationType.CUSTOM_TEXT_AND_ICON}
                                submitButton={{
                                    icon: faKey,
                                    text: "Промени паролата",
                                    size: "full",
                                }}
                                initialData={passwordFormData}
                                isLoading={false}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default AccountPage;