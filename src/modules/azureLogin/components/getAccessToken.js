import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

export default function useAccessToken() {
    const { instance, accounts } = useMsal();
    const [accessToken, setAccessToken] = useState(null);

    if (accounts.length > 0) {
        const request = {
            scopes: ["User.Read"],
            account: accounts[0]
        };
        instance.acquireTokenSilent(request).then(response => {
            setAccessToken(response.accessToken);
        }).catch(error => {
            // acquireTokenSilent can fail for a number of reasons, fallback to interaction
            if (error instanceof InteractionRequiredAuthError) {
                instance.acquireTokenPopup(request).then(response => {
                    setAccessToken(response.accessToken);
                });
            }
        });
    }

    return accessToken;
}