import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export async function getCoverImageLink(
    user: User,
    file: File,
    vehicleId: string,
    use: "cover-image" | "event-image",
) {
    const supabase = createClient();

    const fileExtension = file.name.split(".").pop();
    const filePath = `${user.id}/${use}/${vehicleId}.${fileExtension}`;

    const { data, error: UploadError } = await supabase.storage
        .from("vehicle-media")
        .upload(filePath, file);

    if (UploadError) {
        console.error("Error uploading image: ", UploadError);
        throw UploadError;
    } else {
        const fifteenYearsInSeconds = 15 * 365 * 24 * 60 * 60;

        const { data: signedData, error: signedError } = await supabase.storage
            .from("vehicle-media")
            .createSignedUrl(filePath, fifteenYearsInSeconds);

        if (signedError) {
            console.error("Error creating signed URL: ", signedError);
            throw signedError;
        }

        return signedData.signedUrl;
    }
}
