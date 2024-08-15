export function getCookie(key:string)
{
        const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
}
export function currencyFormat(num:number)
{
        return '$'+(num/100).toFixed(2)
}