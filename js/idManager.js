// js/idManager.js
// Yêu cầu: Sử dụng Closure để giữ lại biến id
const idGenerator = () => {
    let id = 0; // Biến này được giữ lại trong scope
    return () => {
        id += 1;
        return id;
    };
};

export const generateID = idGenerator();