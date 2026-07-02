import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export async function getDocumentLinks(
    user: User,
    files: File[],
    vehicleId: string,
    use: "cover-image" | "event-documents",
): Promise<string[]> {
    const supabase = createClient();
    const signedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExtension = file.name.split(".").pop();
        
        const filePath = `${user.id}/${vehicleId}/${use}/${use}-${i}.${fileExtension}`;

        const { data, error: UploadError } = await supabase.storage
            .from("vehicle-media")
            .upload(filePath, file);

        if (UploadError) {
            console.error("Error uploading image: ", UploadError);
            throw UploadError;
        }

        const fifteenYearsInSeconds = 15 * 365 * 24 * 60 * 60;

        const { data: signedData, error: signedError } = await supabase.storage
            .from("vehicle-media")
            .createSignedUrl(filePath, fifteenYearsInSeconds);

        if (signedError) {
            console.error("Error creating signed URL: ", signedError);
            throw signedError;
        }

        signedUrls.push(signedData.signedUrl);
    }

    return signedUrls;
}