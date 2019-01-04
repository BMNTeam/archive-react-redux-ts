function getAsFormData<T>(data: T)
{
    const formData = new FormData();
    Object.entries(data).map(([k, v]) => {
        formData.append(k, stringifyIfObject(v));
    });
    return formData;
}

function stringifyIfObject (obj: Blob | string)
{
    if (typeof obj === 'object' && !(obj !instanceof Blob))
    {
        return JSON.stringify(obj);
    }
    return obj
}

export {getAsFormData};